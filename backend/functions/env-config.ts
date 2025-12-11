export const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || '';
if (!STRIPE_SECRET_KEY) {
	throw new Error('Missing STRIPE_SECRET_KEY in environment');
}