import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Stripe from "stripe";

// Initialize Stripe without apiVersion literal to avoid TS union issues
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function handler(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const customerId = process.env.DEFAULT_STRIPE_CUSTOMER_ID as string;
    const returnUrl = process.env.STRIPE_BILLING_PORTAL_RETURN_URL as string;
    if (!customerId || !returnUrl) {
      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ error: "Missing customerId or returnUrl" }),
      };
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (e: any) {
    const errMsg =
      e?.raw?.message ??
      e?.message ??
      "Failed to create billing portal session";
    const errCode = e?.raw?.code ?? e?.code ?? "unknown_error";
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: errMsg,
        code: errCode,
      }),
    };
  }
}