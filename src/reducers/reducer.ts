import type { Resource } from '../types/resource';

export type ResourceAction =
  | {
      type: 'ADD_RESOURCE';
      payload: Resource;
    }
  | {
      type: 'UPDATE_RESOURCE';
      payload: Pick<Resource, 'id'> & Partial<Omit<Resource, 'id'>>;
    }
  | {
      type: 'DELETE_RESOURCE';
      payload: Pick<Resource, 'id'>;
    }
  | {
      type: 'TOGGLE_FAVORITE';
      payload: Pick<Resource, 'id'>;
    };

export function resourcesReducer(
  state: Resource[],
  action: ResourceAction,
): Resource[] {
  switch (action.type) {
    case 'ADD_RESOURCE':
      return [...state, action.payload];

    case 'UPDATE_RESOURCE': {
      const { id, ...changes } = action.payload;

      return state.map((resource) => {
        if (resource.id !== id) return resource;

        return {
          ...resource,
          ...changes,
        };
      });
    }

    case 'DELETE_RESOURCE':
      return state.filter((resource) => resource.id !== action.payload.id);

    case 'TOGGLE_FAVORITE': {
      return state.map((resource) => {
        if (resource.id === action.payload.id) {
          return {
            ...resource,
            favorite: !resource.favorite,
          };
        }

        return resource;
      });
    }

    default:
      return state;
  }
}
