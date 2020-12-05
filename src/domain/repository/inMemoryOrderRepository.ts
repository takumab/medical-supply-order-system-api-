import { OrderRepository } from './orderRepository';
import { Order } from '../model/order';

export class InMemoryOrderRepository implements OrderRepository {
  private readonly listOfOrders: Order[] = [
    {
      id: '123',
      item: {
        id: '1',
        name: 'EKG',
        price: 100
      },
      total: 100
    },
    {
      id: '124',
      item: {
        id: '2',
        name: 'Defibrillator',
        price: 200
      },
      total: 200
    },
  ];

  async get(orderNumber: string): Promise<Order> {
    const order = this.findBy(orderNumber);
    if (orderNumber !== order.id) {
      throw new Error("Order number does not exist!");
    }
    return order;
  }

  private findBy(orderNumber: string) {
    const [order] = this.listOfOrders.filter(order => order.id === orderNumber);
    if (!order) {
      return {} as Order
    }
    return order;
  }
}