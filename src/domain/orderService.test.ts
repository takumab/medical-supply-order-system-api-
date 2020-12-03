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
      },
      total: 100
    }
    inMemoryOrderRepositoryMock.get.mockResolvedValue(expectedOrder);
    const orderService = new OrderService(inMemoryOrderRepositoryMock as OrderRepository);

    // act
    const order = await orderService.retrieveOrder("123");

    // assert
    expect(order).toEqual(expectedOrder);
  });

  it('should return an order with a few items', async () => {
     // arrange
    const expectedOrder = {
      id: '123',
      item: [
        {
          id: '1',
          name: 'EKG',
          price: 100
        },
        {
          id: '2',
          name: 'Hospital Bed',
          price: 500
        }
      ],
      total: 600
    }

    inMemoryOrderRepositoryMock.get.mockResolvedValue(expectedOrder);
    const orderService = new OrderService(inMemoryOrderRepositoryMock as OrderRepository);

    // act
    const order = await orderService.retrieveOrder("123");

    // assert
    expect(order).toEqual(expectedOrder);
  });
});
