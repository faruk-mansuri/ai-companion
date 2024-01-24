import Categories from '@/components/Categories';
import Companions from '@/components/Companions';
import SearchInput from '@/components/SearchInput';
import prisma from '@/lib/prismadb';

const HomePage = async ({ searchParams }) => {
  const data = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: { createdAt: 'desc' },

    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default HomePage;
