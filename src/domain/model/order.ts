import { Product } from './product';

export interface Order {
  id: string;
  item: Product | Product[];
  total: number;
}