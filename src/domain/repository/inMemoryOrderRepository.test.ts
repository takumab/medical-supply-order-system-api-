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

  it('should throw error when order number not found', async () => {
    expect.assertions(1);
    // arrange
    const inMemoryOrderRepository = new InMemoryOrderRepository();

    // act and assert
    await expect(inMemoryOrderRepository.get("125")).rejects.toThrow(new Error("Order number does not exist!"));
  });
});