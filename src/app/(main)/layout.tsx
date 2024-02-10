'use client';

import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import { Spinner } from '@/components/spinner';
import Navigation from './_components/Navigation';
import { SearchCommand } from '@/components/search-command';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className='min-h-screen flex'>
      <Navigation />
      <main className='flex-1 overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
