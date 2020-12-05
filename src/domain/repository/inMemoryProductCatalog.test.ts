import { InMemoryProductCatalog } from './inMemoryProductCatalog';

describe('In Memory Product Catalog', () => {
  it('should return a product', async () => {
    // arrange
    const expectedProduct = {
      id: '321',
      name: 'Paracetamol',
      price: 2
    };
    const inMemoryProductCatalog = new InMemoryProductCatalog();
    // act
    const product = await inMemoryProductCatalog.get('321');
    // assert
    expect(product).toEqual(expectedProduct)
  });
});