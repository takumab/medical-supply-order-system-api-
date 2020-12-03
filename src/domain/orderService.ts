import { Order, OrderRepository } from './repository/orderRepository';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async retrieveOrder(orderNumber: string): Promise<Order> {
    try {
      return await this.orderRepository.get(orderNumber);
    } catch (e) {
      return e.stack
    }
  }
}