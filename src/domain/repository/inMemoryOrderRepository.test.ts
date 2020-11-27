import { InMemoryOrderRepository } from './inMemoryOrderRepository';

describe('InMemoryOrderRepository', () => {
  it('should return an order', async () => {
    // arrange
    const expectedOrder = {
      id: '123',
      item: {
        id: '1',
        name: 'EKG',
        price: 100
      }
    };
    const inMemoryRepository = new InMemoryOrderRepository();
    // act
    const actualOrder = await inMemoryRepository.get("123");
    // assert
    expect(actualOrder).toEqual(expectedOrder)
  });

  it('should return an order with correct order number/id', async () => {
    // arrange
    const expectedOrder = {
      id: '124',
      item: {
        id: '2',
        name: 'Defibrillator',
        price: 200
      }
    };
    const inMemoryRepository = new InMemoryOrderRepository();
    // act
    const actualOrder = await inMemoryRepository.get("124");
    // assert
    expect(actualOrder.id).toEqual(expectedOrder.id);
  });
});