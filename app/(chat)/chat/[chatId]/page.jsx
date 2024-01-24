import { redirect } from 'next/navigation';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';
import ChatClient from './components/ChatClient';

const CharIdPage = async ({ params }) => {
  const { userId } = auth();
  if (!userId) return redirectToSignIn();

  const companion = await prisma.companion.findUnique({
    where: { id: params.chatId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect('/');
  }

  return <ChatClient companion={companion} />;
};

export default CharIdPage;
