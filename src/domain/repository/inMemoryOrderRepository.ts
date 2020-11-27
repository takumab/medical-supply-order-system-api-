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
    return this.extractOrder(orderNumber);
  }

  private extractOrder(orderNumber: string) {
    let orderReturned: Order = {id: '', item: {id: '', name: '', price: 1}};
    for (let index = 0; index < this.listOfOrders.length; index++) {
      if (this.listOfOrders[index]['id'] === orderNumber) {
        orderReturned = this.listOfOrders[index];
      }
    }
    return orderReturned;
  }
}