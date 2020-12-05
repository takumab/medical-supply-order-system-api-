import { OrderRepository } from './repository/orderRepository';
import { Order } from './model/order';

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