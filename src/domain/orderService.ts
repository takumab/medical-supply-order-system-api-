import { Item, OrderRepository } from './repository/orderRepository';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async placeOrder(orderNumber: string): Promise<Item> {
    const { item } = await this.orderRepository.get(orderNumber);
    return item;
  }
}