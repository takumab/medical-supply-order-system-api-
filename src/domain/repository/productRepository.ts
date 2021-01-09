import { Product } from '../model/product';

export interface ProductRepository {
  get(productId: string): Promise<Product>;
  findAll(): Promise<Product[]>;
}