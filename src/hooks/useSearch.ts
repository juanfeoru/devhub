import { useState } from 'react';
import type { ResourceSort } from '../types/resource';

export function useSearch() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ResourceSort>('');

  return { sort, setSort, search, setSearch };
}
