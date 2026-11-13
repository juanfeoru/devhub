import { createContext } from 'react';
import type { Resource } from '../types/resource';
import type { ResourceAction } from '../reducers/reducer';

type ResourcesContextValue = {
  resources: Resource[];
  dispatch: React.Dispatch<ResourceAction>;
};

export const ResourcesContext = createContext<ResourcesContextValue | null>(
  null,
);
