import { Amplify } from "aws-amplify";
const env = (import.meta as any).env;

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: env.VITE_USER_POOL_ID,
      userPoolClientId: env.VITE_USER_POOL_CLIENT_ID,
      loginWith: { email: true },
    },
  },
});