import { LibraryBig, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddResource?: () => void;
}

export default function EmptyState({ onAddResource }: EmptyStateProps) {
  return (
    <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface/80 px-6 py-12 text-center'>
      <div className='mb-5 flex size-14 items-center justify-center rounded-xl bg-surface-hover'>
        <LibraryBig size={26} className='text-text-muted' strokeWidth={1.6} />
      </div>

      <h3 className='font-semibold text-text-primary'>
        Todavía no hay recursos
      </h3>

      <p className='mt-2 max-w-sm text-sm leading-relaxed text-text-muted'>
        Tu biblioteca está vacía. Agrega tu primer recurso y empieza a organizar
        tus herramientas favoritas.
      </p>

      <button
        type='button'
        onClick={onAddResource}
        className='mt-6 inline-flex items-center justify-center whitespace-nowrap gap-2 bg-[#2a2a2a] text-interactive rounded-[7px] border border-[#3a3a3a] py-2 px-4 text-sm font-medium transition-colors hover:bg-[#303030] hover:border-[#444]'
      >
        <Plus size={16} />
        Agregar recurso
      </button>
    </div>
  );
}
