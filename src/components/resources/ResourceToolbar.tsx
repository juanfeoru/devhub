import { Grid2x2, List, Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { ResourceSort, ResourceView } from '../../types/resource';

interface ResourceToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  sort: ResourceSort;
  setSort: (value: ResourceSort) => void;
  view: ResourceView;
  setView: (value: ResourceView) => void;
}

export default function ResourceToolbar({
  search,
  setSearch,
  sort,
  setSort,
  view,
  setView,
}: ResourceToolbarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;

      if (
        activeElement instanceof HTMLElement &&
        (activeElement.isContentEditable ||
          activeElement.matches('input, textarea, select, button'))
      ) {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key !== '/' && event.code !== 'Slash') {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center'>
      <div className='relative w-full min-w-0 sm:max-w-xl'>
        <Search
          size={14}
          aria-hidden='true'
          className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted'
        />

        <label htmlFor='resource-search' className='sr-only'>
          Buscar recursos
        </label>

        <input
          ref={searchInputRef}
          id='resource-search'
          type='text'
          autoComplete='off'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Buscar recursos...'
          className='w-full rounded-lg border border-border-strong bg-surface-elevated py-2 pl-8 pr-10 text-[13px] text-interactive transition-colors focus:border-[#3d3d3d] focus:bg-[#1d1d1d]'
        />

        {search ? (
          <button
            type='button'
            onClick={() => {
              setSearch('');
              searchInputRef.current?.focus();
            }}
            aria-label='Limpiar búsqueda'
            title='Limpiar búsqueda'
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-text-muted transition-colors hover:bg-surface-active hover:text-text-primary'
          >
            <X size={14} aria-hidden='true' />
          </button>
        ) : (
          <kbd
            aria-hidden='true'
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-border-strong bg-surface px-1.5 py-0.5 text-[11px] font-medium text-text-muted'
          >
            /
          </kbd>
        )}
      </div>

      <div className='flex shrink-0 items-center gap-1.5 sm:justify-end'>
        <label htmlFor='resource-sort' className='sr-only'>
          Ordenar recursos
        </label>

        <select
          id='resource-sort'
          value={sort}
          onChange={(e) => setSort(e.target.value as ResourceSort)}
          className='cursor-pointer rounded-md border border-border-strong bg-surface px-2.5 py-1.5 font-mono text-xs text-text-muted'
        >
          <option value=''>Ordenar</option>
          <option value='name'>Nombre A-Z</option>
          <option value='recent'>Añadidos recientemente</option>
        </select>

        <div
          role='group'
          aria-label='Vista de recursos'
          className='flex shrink-0 gap-0.5 rounded-lg border border-border-strong bg-surface p-0.75'
        >
          <button
            type='button'
            onClick={() => setView('grid')}
            title='Vista de cuadrícula'
            aria-label='Vista de cuadrícula'
            aria-pressed={view === 'grid'}
            className={`grid size-7 place-items-center rounded-md transition-colors ${
              view === 'grid'
                ? 'border border-border-strong bg-surface-active text-text-primary'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Grid2x2 size={16} aria-hidden='true' />
          </button>

          <button
            type='button'
            onClick={() => setView('list')}
            title='Vista de lista'
            aria-label='Vista de lista'
            aria-pressed={view === 'list'}
            className={`grid size-7 place-items-center rounded-md transition-colors ${
              view === 'list'
                ? 'border border-border-strong bg-surface-active text-text-primary'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <List size={16} aria-hidden='true' />
          </button>
        </div>
      </div>
    </div>
  );
}
