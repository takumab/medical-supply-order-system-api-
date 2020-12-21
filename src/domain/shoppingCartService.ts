import { Product } from './model/product';
import { ProductRepository } from './repository/productRepository';

export class ShoppingCartService {
  private _shoppingCartProductsList: Product[] = [];

  constructor(private productRepository: ProductRepository) {}

  async add(product: Product): Promise<void> {
    const productReturned = await this.productRepository.get(product.id);
    this._shoppingCartProductsList.push(productReturned);
  }

  get showProductsInShoppingCart(): Product[] {
    return this._shoppingCartProductsList;
  }
}