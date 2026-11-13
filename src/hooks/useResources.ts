import { useContext } from 'react';
import { ResourcesContext } from '../context/ResourcesContext';

export function useResources() {
  const context = useContext(ResourcesContext);

  if (context === null) {
    throw new Error('useResources debe utilizarse dentro de ResourcesProvider');
  }

  return context;
}
