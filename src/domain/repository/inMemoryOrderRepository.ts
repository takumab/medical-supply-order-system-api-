import { Order, OrderRepository } from './orderRepository';

export class InMemoryOrderRepository implements OrderRepository {
  async get(orderNumber: string): Promise<Order> {
    if (orderNumber === '124') {
      return {
        id: '124',
        item: {
          id: '2',
          name: 'Defibrillator',
          price: 200
        }
      }
    }

    return {
      id: '123',
      item: {
        id: '1',
        name: 'EKG',
        price: 100
      }
    }
  }
}