import { useOutletContext } from 'react-router';
import { useResources } from '../hooks/useResources';
import type { Resource } from '../types/resource';
import { PageHeader } from '../components/layout/Header';
import EmptyState from '../components/ui/EmptyState';
import ResourceCard from '../components/resources/ResourceCard';
import Pagination from '../components/resources/Pagination';
import { useResourcePagination } from '../hooks/useResourcePagination';
import { useResourceActions } from '../hooks/useResourceActions';

interface OutletContext {
  handleUpdateResource: (resource: Resource) => void;
}

export default function FavoritesPage() {
  const { resources } = useResources();
  const { handleUpdateResource } = useOutletContext<OutletContext>();
  const { handleDeleteResource, handleUpdateFavorite } = useResourceActions();

  const favoritesResources = resources.filter((resource) => resource.favorite);

  const {
    currentPage,
    totalPages,
    paginatedResources,
    startItem,
    endItem,
    setCurrentPage,
  } = useResourcePagination(favoritesResources);

  return (
    <section className='space-y-5'>
      <PageHeader
        title='Favoritos'
        description='Tus recursos guardados para acceder rápidamente a ellos.'
      />

      <div className='flex items-center gap-2.5 mt-8 mb-3.5'>
        <span className='font-mono text-[11px] font-semibold text-text-muted/80 tracking-wider uppercase'>
          Mis favoritos:
        </span>

        <div className='flex-1 h-px bg-[#1e1e1e]' />

        <span className='font-mono text-text-muted text-xs bg-surface-elevated border border-[#222] rounded-sm py-0.5 px-1.5'>
          {favoritesResources.length}
        </span>
      </div>

      {favoritesResources.length <= 0 ? (
        <EmptyState
          title='Todavía no tienes favoritos'
          description='Guarda tus recursos favoritos para encontrarlos rápidamente.'
          exploreLink='/resources'
        />
      ) : (
        <div
          className={
            'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }
        >
          {paginatedResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onToggleFavorite={() => handleUpdateFavorite(resource.id)}
              onEdit={() => handleUpdateResource(resource)}
              onDelete={() => handleDeleteResource(resource.id)}
            />
          ))}
        </div>
      )}

      {totalPages > 0 && (
        <div className='mt-8 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-text-muted'>
            Mostrando {startItem}-{endItem} de {favoritesResources.length}
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}
