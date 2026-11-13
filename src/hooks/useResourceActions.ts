import type { Resource } from '../types/resource';
import { useResources } from './useResources';

export function useResourceActions() {
  const { dispatch } = useResources();

  const handleDeleteResource = (id: string) => {
    dispatch({
      type: 'DELETE_RESOURCE',
      payload: { id },
    });
  };

  const handleUpdateFavorite = (id: string) => {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: { id },
    });
  };

  const handleSaveResource = (resource: Resource, isEditing: boolean) => {
    dispatch({
      type: isEditing ? 'UPDATE_RESOURCE' : 'ADD_RESOURCE',
      payload: resource,
    });
  };

  return {
    handleDeleteResource,
    handleUpdateFavorite,
    handleSaveResource,
  };
}
