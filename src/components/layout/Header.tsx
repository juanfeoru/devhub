import { Menu } from 'lucide-react';
import type { ReactNode } from 'react';

interface MobileHeaderProps {
  mobileOpen: boolean;
  onOpen: () => void;
}

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function MobileHeader({ mobileOpen, onOpen }: MobileHeaderProps) {
  return (
    <header className='w-full bg-surface flex items-center gap-2.5 p-4.5 border-b border-border md:hidden'>
      <div className='size-7 grid place-items-center bg-surface-active border border-border-strong rounded-[7px]'>
        <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
          <rect x='1' y='1' width='6' height='6' rx='1.5' fill='#666'></rect>
          <rect x='9' y='1' width='6' height='6' rx='1.5' fill='#666'></rect>
          <rect x='1' y='9' width='6' height='6' rx='1.5' fill='#444'></rect>
          <rect x='9' y='9' width='6' height='6' rx='1.5' fill='#666'></rect>
        </svg>
      </div>

      <span className='font-mono font-semibold text-text-secondary'>
        DevHub
      </span>

      <button
        type='button'
        onClick={onOpen}
        className='size-9 grid place-items-center text-text-muted ml-auto'
        aria-label='Abrir menú'
        aria-controls='app-sidebar'
        aria-expanded={mobileOpen}
      >
        <Menu size={20} aria-hidden='true' />
      </button>
    </header>
  );
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className='flex flex-col gap-4 border-border mb-2 pb-6 md:flex-row md:items-center md:gap-0 md:justify-between md:border-b md:mb-6'>
      <div>
        <h1 className='text-2xl font-semibold text-interactive'>{title}</h1>

        <p className='text-sm text-text-muted'>{description}</p>
      </div>

      <div>{actions}</div>
    </header>
  );
}
