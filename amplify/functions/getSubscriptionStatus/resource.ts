import { defineFunction } from "@aws-amplify/backend";

export const getSubscriptionStatus = defineFunction({
  entry: "./handler.ts",
  environment: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    DEFAULT_STRIPE_CUSTOMER_ID: process.env.DEFAULT_STRIPE_CUSTOMER_ID!,
  },
});
