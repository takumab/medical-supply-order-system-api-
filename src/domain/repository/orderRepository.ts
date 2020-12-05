import { Order } from '../model/order';

// Right side Inside (Port)
export interface OrderRepository {
  get(orderNumber: string): Promise<Order>;
}