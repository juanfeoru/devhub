import { LibraryBig, Plus, SquareArrowOutUpRight } from 'lucide-react';
import { NavLink } from 'react-router';

interface EmptyStateProps {
  title: string;
  description: string;
  onAddResource?: () => void;
  exploreLink?: string;
}

export default function EmptyState({
  title,
  description,
  onAddResource,
  exploreLink,
}: EmptyStateProps) {
  const buttonStyles =
    'mt-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border border-[#3a3a3a] bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-interactive transition-colors hover:border-[#444] hover:bg-[#303030]';

  return (
    <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface/80 px-6 py-12 text-center'>
      <div className='mb-5 flex size-14 items-center justify-center rounded-xl bg-surface-hover'>
        <LibraryBig size={26} className='text-text-muted' strokeWidth={1.6} />
      </div>

      <h3 className='font-semibold text-text-primary'>{title}</h3>

      <p className='mt-2 max-w-sm text-sm leading-relaxed text-text-muted'>
        {description}
      </p>

      {onAddResource && (
        <button type='button' onClick={onAddResource} className={buttonStyles}>
          <Plus size={16} aria-hidden='true' />
          Agregar recurso
        </button>
      )}

      {exploreLink && (
        <NavLink to={exploreLink} className={buttonStyles}>
          <SquareArrowOutUpRight size={14} aria-hidden='true' />
          Explorar recursos
        </NavLink>
      )}
    </div>
  );
}
