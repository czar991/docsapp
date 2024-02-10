'use client';

import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { UserItem } from './UserItem';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Item from './Item';
import { toast } from 'sonner';
import DocumentsList from './DocumentsList';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TrashBox } from './Trashbox';
import { useSearch } from '@/hooks/use-search';
import { useSettings } from '@/hooks/use-settings';
import { Navbar } from './Navbar';
export default function Navigation() {
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isResetting, setIsResetting] = useState(false);
  const create = useMutation(api.documents.create);
  const search = useSearch();
  const settings = useSettings();
  const router = useRouter();
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)');
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  const handleCreate = () => {
    const promise = create({ title: 'Untitled' }).then((documentId) => router.push(`/documents/${documentId}`));
    toast.promise(promise, {
      loading: 'Создаём новую заметку...',
      success: 'Новая заметка создана!',
      error: 'Не удалось создать новую заметку.',
    });
  };
  return (
    <>
      <aside
        className={cn(
          'group/sidebar bg-secondary overflow-y-auto relative flex w-60 flex-col z-[2000]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
        ref={sidebarRef}
      >
        <div
          role='button'
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobile && 'opacity-100'
          )}
          onClick={collapse}
        >
          <ChevronsLeft />
        </div>
        <div>
          <UserItem />
          <Item onClick={search.onOpen} label='Поиск' icon={Search} isSearch />
          <Item onClick={settings.onOpen} label='Настройки' icon={Settings} />
          <Item onClick={handleCreate} label='Новая заметка' icon={PlusCircle} />
        </div>
        <div className='mt-4'>
          <DocumentsList />
          <Item onClick={handleCreate} icon={Plus} label='Добавить заметку' />
          <Popover>
            <PopoverTrigger className='w-full mt-4'>
              <Item label='Корзина' icon={Trash} />
            </PopoverTrigger>
            <PopoverContent className='p-0 w-72' side={isMobile ? 'bottom' : 'right'}>
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <span
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute w-1 bg-primary/10 right-0 top-0 bottom-0'
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        ></span>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[2000] left-60 w-[calc(100%-240px)] overflow-hidden',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className='bg-transparent px-3 py-2 w-full'>{isCollapsed && <MenuIcon onClick={resetWidth} role='button' className='h-6 w-6 text-muted-foreground' />}</nav>
        )}
      </div>
    </>
  );
}
