import { Plus } from 'lucide-react';
import { PageHeader } from '../components/layout/Header';
import { useState } from 'react';
import ResourceToolbar from '../components/resources/ResourceToolbar';
import { resources as dataResources } from '../data/resources';
import ResourceCard from '../components/resources/ResourceCard';
import EmptyState from '../components/ui/EmptyState';

export type ResourceView = 'grid' | 'list';
export type ResourceSort = '' | 'name' | 'recent';

export default function ResourcesPage() {
  const [view, setView] = useState<ResourceView>('grid');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ResourceSort>('');
  const resources = dataResources;

  const normalizedSearch = search.trim().toLowerCase();

  const filteredResources = resources.filter((resource) => {
    return (
      resource.title.toLowerCase().includes(normalizedSearch) ||
      resource.description.toLowerCase().includes(normalizedSearch) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))
    );
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sort === 'name') {
      return a.title.localeCompare(b.title);
    }

    if (sort === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return 0;
  });

  return (
    <section className='space-y-5'>
      <PageHeader
        title='Todos los recursos'
        description='Administra y organiza tus recursos de desarrollo.'
        actions={
          <button
            type='button'
            aria-label='Agregar recurso'
            className='w-full inline-flex items-center justify-center whitespace-nowrap gap-1.5 bg-[#2a2a2a] text-interactive rounded-[7px] border border-[#3a3a3a] py-1.75 px-3.5 text-[13px] font-medium transition-colors hover:bg-[#303030] hover:border-[#444] md:w-fit md:justify-start'
          >
            <Plus size={18} aria-hidden='true' />
            Agregar recurso
          </button>
        }
      />

      <ResourceToolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
      />

      <div className='flex items-center gap-2.5 mt-8 mb-3.5'>
        <span className='font-mono text-[11px] font-semibold text-text-muted/80 tracking-wider uppercase'>
          Recursos:
        </span>

        <div className='flex-1 h-px bg-[#1e1e1e]' />

        <span className='font-mono text-text-muted text-xs bg-surface-elevated border border-[#222] rounded-sm py-0.5 px-1.5'>
          {sortedResources.length}
        </span>
      </div>

      {sortedResources.length <= 0 ? (
        <EmptyState />
      ) : (
        <div
          className={`grid gap-4 ${
            view === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {sortedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </section>
  );
}
