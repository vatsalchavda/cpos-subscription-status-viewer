import { defineFunction } from "@aws-amplify/backend";

export const health = defineFunction({
  entry: "./handler.ts",
});
