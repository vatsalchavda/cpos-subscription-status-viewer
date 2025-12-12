import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Stripe from "stripe";

type SubscriptionInfo = {
  status: "active" | "trialing" | "past_due" | "canceled" | "none";
  planName?: string;
  renewalDate?: string; // ISO
};

// Initialize Stripe without apiVersion literal to avoid TS union issues
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function handler(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const customerId = process.env.DEFAULT_STRIPE_CUSTOMER_ID as string;
    if (!customerId) {
      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ error: "DEFAULT_STRIPE_CUSTOMER_ID missing" }),
      };
    }

    const subs = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      expand: ["data.items.data.price.product"],
      limit: 1,
    });

    let info: SubscriptionInfo = { status: "none" };
    const sub = subs.data[0];
    if (sub) {
      const statusMap: Record<string, SubscriptionInfo["status"]> = {
        active: "active",
        trialing: "trialing",
        past_due: "past_due",
        canceled: "canceled",
        unpaid: "past_due",
        incomplete: "past_due",
        incomplete_expired: "canceled",
      };
      info.status = statusMap[sub.status] ?? "none";

      const item = sub.items.data[0];
      const price = item?.price;
      const product = price?.product as Stripe.Product | null;
      info.planName = product?.name ?? price?.nickname ?? price?.id ?? undefined;

      // Guard TS on period end (Stripe types may vary)
      const periodEnd = (sub as any).current_period_end as number | undefined;
      if (periodEnd) {
        info.renewalDate = new Date(periodEnd * 1000).toISOString();
      }
    }

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    };
  } catch (e: any) {
    const errMsg = e?.raw?.message ?? e?.message ?? "Failed to fetch subscription";
    const errCode = e?.raw?.code ?? e?.code ?? "unknown_error";
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: errMsg, code: errCode }),
    };
  }
}