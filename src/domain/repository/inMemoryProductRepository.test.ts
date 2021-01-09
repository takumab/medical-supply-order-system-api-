import { InMemoryProductRepository } from './inMemoryProductRepository';

describe('In Memory Product Repository', () => {
  it('should return a product', async () => {
    // arrange
    const expectedProduct = {
      id: '321',
      name: 'Paracetamol',
      price: 2
    };
    const inMemoryProductRepository = new InMemoryProductRepository();
    // act
    const product = await inMemoryProductRepository.get('321');
    // assert
    expect(product).toEqual(expectedProduct)
  });
  it('should return all products', async () => {
    // arrange
    const inMemoryProductRepository = new InMemoryProductRepository();
    const expectedProduct = [
      {
        id: '321',
        name: 'Paracetamol',
        price: 2
      },
      {
        id: '322',
        name: 'IB Profen',
        price: 1
      },
    ];
    // act
    const products = await inMemoryProductRepository.findAll();
    // assert
    expect(products).toEqual(expectedProduct)
  });
});