import CompanionForm from '@/components/CompanionForm';
import prisma from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';

const CompanionIdPage = async ({ params }) => {
  const { userId } = auth();

  // TODO check subscription

  if (!userId) return redirectToSignIn();

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prisma.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
