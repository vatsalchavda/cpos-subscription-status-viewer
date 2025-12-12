import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from './env-config';

// Initialize the Stripe client with the secret key
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const handler = async (event: any = {}): Promise<any> => {
  try {
    // Example logic: Fetch a subscription by its ID
    const subscriptionId = event.subscriptionId;

    if (!subscriptionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Subscription ID is required' }),
      };
    }

    // Fetch the subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return {
      statusCode: 200,
      body: JSON.stringify({ subscription }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching subscription', error: error.message }),
    };
  }
};
