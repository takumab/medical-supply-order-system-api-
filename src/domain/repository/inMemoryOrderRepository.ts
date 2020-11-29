import { Order, OrderRepository } from './orderRepository';

export class InMemoryOrderRepository implements OrderRepository {
  private readonly listOfOrders: Order[] = [
    {
      id: '123',
      item: {
        id: '1',
        name: 'EKG',
        price: 100
      }
    },
    {
      id: '124',
      item: {
        id: '2',
        name: 'Defibrillator',
        price: 200
      }
    }
  ];

  async get(orderNumber: string): Promise<Order> {
    return this.getOrderBy(orderNumber);
  }

  private getOrderBy(orderNumber: string) {
    let orderReturned: Order = {id: '', item: {id: '', name: '', price: 1}};
    for (const order of this.listOfOrders) {
      if (order.id === orderNumber) {
        orderReturned = order;
      }
    }
    return orderReturned;
  }
}