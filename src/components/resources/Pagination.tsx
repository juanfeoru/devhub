import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) pages.push('...');

    pages.push(totalPages);

    return pages;
  };

  const buttonStyles =
    'inline-flex size-8 items-center justify-center rounded-lg border border-border-strong text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:pointer-events-none disabled:opacity-40';

  return (
    <nav
      aria-label='Paginación de recursos'
      className='flex items-center justify-center gap-2'
    >
      <button
        type='button'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='Página anterior'
        title='Página anterior'
        className={buttonStyles}
      >
        <ChevronLeft size={17} aria-hidden='true' />
      </button>

      {getPages().map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className='flex size-8 items-center justify-center text-sm text-text-muted'
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type='button'
            onClick={() => onPageChange(page)}
            aria-label={`Página ${page}`}
            title={`Página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={
              currentPage === page
                ? 'inline-flex size-8 items-center justify-center rounded-lg bg-interactive text-sm font-semibold text-bg'
                : buttonStyles
            }
          >
            {page}
          </button>
        ),
      )}

      <button
        type='button'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='Página siguiente'
        title='Página siguiente'
        className={buttonStyles}
      >
        <ChevronRight size={17} aria-hidden='true' />
      </button>
    </nav>
  );
}
