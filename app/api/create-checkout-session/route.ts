import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe/client';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { price, quantity = 1, metadata = {} } = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: price,
            quantity: quantity,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/canceled`,
        metadata: metadata,
      });

      return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
      return NextResponse.json({ statusCode: 500, message: err.message });
    }
  } else {
    return NextResponse.json({ statusCode: 405, message: 'Method Not Allowed' });
  }
}