import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";

// Ensure functions are included by importing their resource modules (side effects)
import "./functions/getSubscriptionStatus/resource.js";
import "./functions/createBillingPortalSession/resource.js";
import "./functions/health/resource.js";

export default defineBackend({
  auth,
});
