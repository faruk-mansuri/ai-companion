import prisma from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { checkSubscription } from '@/lib/subscription';

export const PATCH = async (req, { params }) => {
  try {
    const { companionId } = params;
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, categoryId, instructions, seed } = body;

    if (!companionId) {
      return new NextResponse('CompanionId is required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // PRO
    const isPro = await checkSubscription();
    if (!isPro) {
      return new NextResponse('Pro subscription required', { status: 403 });
    }

    const singleCompanion = await prisma.companion.findUnique({
      where: {
        id: params.companionId,
      },
    });

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_KEY,
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET,
    });

    if (src !== singleCompanion.src) {
      await cloudinary.v2.uploader.destroy(
        singleCompanion.src.split('/').pop().split('.')[0]
      );
    }

    const companion = await prisma.companion.update({
      where: {
        id: companionId,
        userId: user.id,
      },
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
    console.log('[COMPANION_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const singleCompanion = await prisma.companion.findUnique({
      where: {
        id: params.companionId,
      },
    });

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_KEY,
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET,
    });

    if (singleCompanion.src) {
      await cloudinary.v2.uploader.destroy(
        singleCompanion.src.split('/').pop().split('.')[0]
      );
    }

    const companion = await prisma.companion.delete({
      where: { userId, id: params.companionId },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[COMPANION_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
