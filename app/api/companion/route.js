import prisma from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, categoryId, instructions, seed } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !categoryId ||
      !instructions ||
      !seed
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // TODO Check for subscription
    const isPro = await checkSubscription();
    if (!isPro) {
      return new NextResponse('Pro subscription required', { status: 403 });
    }

    const companion = await prisma.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json({ companion });
  } catch (error) {
    console.log('[COMPANION_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
