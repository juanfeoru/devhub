import { tagIcons } from '../constants/resource-icons';
import type { Resource } from '../types/resource';

export function getResourceIcon(resource: Resource) {
  if (resource.icon) {
    return resource.icon;
  }

  for (const tag of resource.tags) {
    const normalizedTag = tag
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const iconName = tagIcons[normalizedTag];

    if (iconName) {
      return iconName;
    }
  }

  return 'CodeXml';
}
