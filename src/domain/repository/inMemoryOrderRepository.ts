import { Order, OrderRepository } from './orderRepository';

export class InMemoryOrderRepository implements OrderRepository {
  async get(orderNumber: string): Promise<Order> {
    throw new Error("Not implemented yet")
  }
}