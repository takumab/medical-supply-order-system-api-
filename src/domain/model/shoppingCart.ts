import { Product } from './product';

// Not sure if I need this right now or ever. We'll see
interface ShoppingCart {
  id: string;
  product: Product | Product[];
  qty: number;
}