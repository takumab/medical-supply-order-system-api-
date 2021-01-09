import { ProductRepository } from './productRepository';
import { Product } from '../model/product';

export class InMemoryProductRepository implements ProductRepository {
  private listOfProducts: Product[] = [
    {
      id: '321',
      name: 'Paracetamol',
      price: 2
    },
    {
      "id": "322",
      "name": "IB Profen",
      "price": 1
    }
  ];

  async get(productId: string): Promise<Product> {
    const [product] = this.listOfProducts.filter(product => product.id === productId);
    return product
  }

  async findAll(): Promise<Product[]> {
    return this.listOfProducts
  }
}