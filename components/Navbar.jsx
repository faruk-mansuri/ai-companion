'use client';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import ModeToggle from './ModeToggle';
import MobileSidebar from './MobileSidebar';
import { useProModal } from '@/hooks/useProModal';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

const Navbar = ({ isPro }) => {
  const proModal = useProModal();
  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-2 border-b border-primary/10 bg-secondary h-16'>
      <div className='flex items-center'>
        <MobileSidebar isPro={isPro} />
        <Link href='/'>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary  bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>

      <div className='flex items-center gap-x-3'>
        {!isPro && (
          <Button size='sm' variant='premium' onClick={proModal.onOpen}>
            Upgrade
            <Sparkles className='w-4 h-4 fill-white text-white ml-2' />
          </Button>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl='/sign-in' />
      </div>
    </div>
  );
};

export default Navbar;
