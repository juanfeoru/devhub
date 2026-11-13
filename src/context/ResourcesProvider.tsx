import { useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';

import { resources as initialResources } from '../data/resources';
import type { Resource } from '../types/resource';
import { resourcesReducer } from '../reducers/reducer';
import { ResourcesContext } from './ResourcesContext';

const STORAGE_KEY = 'devhub-resources';

function loadResources(): Resource[] {
  try {
    const storedResources = localStorage.getItem(STORAGE_KEY);

    if (storedResources === null) return initialResources;

    const parsedResources: unknown = JSON.parse(storedResources);

    if (!Array.isArray(parsedResources)) return initialResources;

    return parsedResources as Resource[];
  } catch {
    return initialResources;
  }
}

function saveResources(resources: Resource[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  } catch (error) {
    console.error('Error al guardar los recursos:', error);
  }
}

export function ResourcesProvider({ children }: { children: ReactNode }) {
  const [resources, dispatch] = useReducer(
    resourcesReducer,
    undefined,
    loadResources,
  );

  useEffect(() => {
    saveResources(resources);
  }, [resources]);

  return (
    <ResourcesContext.Provider value={{ resources, dispatch }}>
      {children}
    </ResourcesContext.Provider>
  );
}
