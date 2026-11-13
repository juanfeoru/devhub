import { useState } from 'react';
import type { Resource } from '../types/resource';

export function useResourcePagination(
  resources: Resource[],
  itemsPerPage = 10,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(resources.length / itemsPerPage);

  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const paginatedResources = resources.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const startItem = resources.length > 0 ? startIndex + 1 : 0;

  const endItem = Math.min(startIndex + itemsPerPage, resources.length);

  return {
    currentPage: safeCurrentPage,
    totalPages,
    paginatedResources,
    startItem,
    endItem,
    setCurrentPage,
  };
}
