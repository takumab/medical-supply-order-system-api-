import { OrderService } from './orderService';
import { OrderRepository } from './repository/orderRepository';

const inMemoryOrderRepositoryMock = {
  get: jest.fn()
}

describe('OrderService', () => {
  it('should return an order', async () => {
     // arrange
    const expectedOrder = {
      id: '123',
      item: {
        id: '1',
        name: 'EKG',
        price: 100
      }
    }
    const orderService = new OrderService(inMemoryOrderRepositoryMock as OrderRepository);

    // act
    inMemoryOrderRepositoryMock.get.mockResolvedValue(expectedOrder);
    const order = await orderService.retrieveOrder("123");

    // assert
    expect(order).toEqual(expectedOrder);
  });
});
