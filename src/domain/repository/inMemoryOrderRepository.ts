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
    const order = this.getOrderBy(orderNumber);
    if (orderNumber !== order.id) {
      throw new Error("Order number does not exist!");
    }
    return order;
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