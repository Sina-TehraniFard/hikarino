import type {NextApiRequest, NextApiResponse} from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil',
});

type Data = { url: string } | { error: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({error: 'Method Not Allowed'});
    }

    const {priceId, uid, coinAmount} = req.body as {
        priceId: string;
        uid: string;
        coinAmount: number;
    };

    console.log('Received request with:', {priceId, uid, coinAmount});

    if (!priceId || !uid || !coinAmount) {
        console.error('Missing parameters:', {priceId, uid, coinAmount});
        return res.status(400).json({error: 'Missing required parameters'});
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
            metadata: {
                uid,
                coinAmount: coinAmount.toString()
            },
            payment_intent_data: {
                metadata: {
                    uid,
                    coinAmount: coinAmount.toString()
                }
            }
        });

        console.log('Created checkout session:', {
            id: session.id,
            payment_intent: session.payment_intent,
            metadata: session.metadata,
        });

        if (!session.url) {
            throw new Error('No session URL returned');
        }
        return res.status(200).json({url: session.url});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return res.status(500).json({error: errorMessage});
    }
} 