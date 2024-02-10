'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';
export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl'>
        Добро пожаловать в <span className='font-medium text-teal-500'>DocsApp</span>
      </h1>
      <p className='text-base sm:text-xl md:text-2xl font-medium'>DocsApp - это рабочее пространство, где работа идет лучше и быстрее.</p>
      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/documents'>
            Войти
            <ArrowRight className='h-4 w-4 ml-2' />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode='modal'>
          <Button>
            Получить доступ
            <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
