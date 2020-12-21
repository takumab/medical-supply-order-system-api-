import { ShoppingCartService } from './shoppingCartService';
import { Product } from './model/product';
import { ProductRepository } from './repository/productRepository';

const inMemoryCatalogMock = {
  get: jest.fn()
}

describe('Shopping Cart Service', () => {
  it('should add a product to the shopping cart', async () => {
    // arrange
    const product: Product = {
      id: '321',
      name: 'Paracetamol',
      price: 2
    } ;
    const listOfProducts = [product];
    inMemoryCatalogMock.get.mockResolvedValue(product);
    const shoppingCartService = new ShoppingCartService(inMemoryCatalogMock as ProductRepository);
    // act
    await shoppingCartService.add(product)
    // assert
    expect(inMemoryCatalogMock.get).toHaveBeenCalledWith(product.id);
    expect(shoppingCartService.showProductsInShoppingCart).toEqual(listOfProducts);
  });
});