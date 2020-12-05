import { ProductRepository } from './productRepository';
import { Product } from '../model/product';

export class InMemoryProductCatalog implements ProductRepository {
  private listOfProducts: Product[] = [
    {
      id: '321',
      name: 'Paracetamol',
      price: 2
    }
  ];

  async get(productId: string): Promise<Product> {
    const [product] = this.listOfProducts.filter(product => product.id === productId);
    return product
  }
}