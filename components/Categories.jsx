'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

const Categories = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  const onClick = (id) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className='w-full overflow-x-auto space-x-2 flex p-1'>
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          `
   
   flex
   items-center
   text-center
   md:text-sm
   px-2 md:px-4
   py-3
   md:py-3
   rounded-md
   bg-primary/10
   hover:opacity-75
   transition
   `,
          !categoryId && 'bg-primary/25'
        )}
      >
        Newest
      </button>
      {data.map((item) => {
        return (
          <button
            onClick={() => onClick(item.id)}
            key={item.id}
            className={cn(
              `
   
   flex
   items-center
   text-center
   md:text-sm
   px-2 
   md:px-4
   py-3
   md:py-3
   rounded-md
   bg-primary/10
   hover:opacity-75
   transition
   
   `,
              item.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
            )}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
