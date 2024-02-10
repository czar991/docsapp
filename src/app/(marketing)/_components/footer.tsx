import { Button } from '@/components/ui/button';
import { Logo } from './Logo';

export default function Footer() {
  return (
    <div className='flex items-center px-6 bg-background z-50'>
      <Logo />
      <div className='md:ml-auto w-full justify-end flex items-center gap-x-2 text-muted-foreground flex-1'>
        <Button variant='ghost' size='sm'>
          Политика конфиденциальности
        </Button>
      </div>
    </div>
  );
}
