import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";

// Ensure functions are included by importing their resource modules (side effects)
import "./functions/getSubscriptionStatus/resource.js";
import "./functions/createBillingPortalSession/resource.js";
import "./functions/health/resource.js";
import "./functions/ping/resource.js";

export default defineBackend({
  auth,
});
