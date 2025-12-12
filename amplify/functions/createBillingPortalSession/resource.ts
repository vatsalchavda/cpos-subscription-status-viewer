import { defineFunction } from "@aws-amplify/backend";

export const createBillingPortalSession = defineFunction({
  entry: "./handler.ts",
  environment: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    DEFAULT_STRIPE_CUSTOMER_ID: process.env.DEFAULT_STRIPE_CUSTOMER_ID!,
    STRIPE_BILLING_PORTAL_RETURN_URL: process.env.STRIPE_BILLING_PORTAL_RETURN_URL!,
  },
});
