'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import qs from 'query-string';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');

  const [value, setValue] = useState(name || '');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      name: debouncedValue,
      // categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground ' />
      <Input
        placeholder='Search...'
        className='pl-10 bg-primary/10 tracking-wide'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
