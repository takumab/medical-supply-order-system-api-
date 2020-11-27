import { OrderService } from './orderService';
import { OrderRepository } from './repository/orderRepository';

const inMemoryOrderRepositoryMock = {
  get: jest.fn()
}

describe('OrderService', () => {
  it('should return an item', async () => {
     // arrange
    const order = {
      id: '123',
      item: {
        id: '1',
        name: 'EKG',
        price: 100
      }
    }
    const orderService = new OrderService(inMemoryOrderRepositoryMock as OrderRepository);

    // act
    inMemoryOrderRepositoryMock.get.mockResolvedValue(order);
    const item = await orderService.placeOrder("123");

    // assert
    expect(item).toEqual(order.item);
  });
});
