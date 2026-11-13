import type { ResourceIconName } from '../constants/resource-icons';

export type ResourceSort = '' | 'name' | 'recent';

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  favorite: boolean;
  tags: string[];
  icon?: ResourceIconName;
  createdAt: string;
}
