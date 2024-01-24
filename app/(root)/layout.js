import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { checkSubscription } from '@/lib/subscription';
import React from 'react';

const RootLayout = async ({ children }) => {
  const isPro = await checkSubscription();
  return (
    <div className='h-full'>
      <Navbar isPro={isPro} />
      <div className='hidden w-20 mt-16 md:flex fixed inset-y-0'>
        <Sidebar isPro={isPro} />
      </div>
      <main className='md:pl-20 pt-16 h-full'>{children}</main>
    </div>
  );
};

export default RootLayout;
