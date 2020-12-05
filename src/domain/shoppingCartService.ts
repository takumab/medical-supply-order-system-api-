import { Product } from './model/product';
import { ProductRepository } from './repository/productRepository';

export class ShoppingCartService {
  private _shoppingCartProductsList: Product[] = [];

  constructor(private catalog: ProductRepository) {}

  async add(product: Product): Promise<void> {
    const productReturned = await this.catalog.get(product.id);
    this._shoppingCartProductsList.push(productReturned);
  }

  get shoppingCartProductsList(): Product[] {
    return this._shoppingCartProductsList;
  }
}