import { defineFunction } from "@aws-amplify/backend";

export const ping = defineFunction({
  entry: "./handler.ts",
});
