import { defineFunction } from "@aws-amplify/backend";
export const ping = defineFunction({
  name: "ping",
  entry: "./handler.ts",
  authorization: "none",
});
