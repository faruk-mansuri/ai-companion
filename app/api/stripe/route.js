import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { absoluteURL } from '@/lib/utils';

const settingsUrl = absoluteURL('/settings');

export const GET = async (req) => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user)
      return new NextResponse('Unauthorized', { status: 401 });

    const userSubscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: 'Companion Pro',
              description: 'Create Custom AI Companions',
            },
            unit_amount: 2000 * 100,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],

      metadata: { userId },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log('[STRIPE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
