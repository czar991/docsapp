'use client';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function DocumentsPage() {
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const onCreate = () => {
    const promise = create({ title: 'Untitled' }).then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: 'Создаём новую заметку...',
      success: 'Новая заметка создана!',
      error: 'Не удалось создать новую заметку.',
    });
  };
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src='/empty.png' height='300' width='300' alt='Empty' className='dark:hidden' />
      <Image src='/empty-dark.png' height='300' width='300' alt='Empty' className='hidden dark:block' />
      <p className='text-lg font-medium'>Welcome to DocsApp</p>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Создать заметку
      </Button>
    </div>
  );
}
