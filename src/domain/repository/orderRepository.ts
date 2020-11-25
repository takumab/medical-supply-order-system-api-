// Data models/Domain models (move into own folder)
export interface Item {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  item: Item;
}

// Right side Inside (Port)
export interface OrderRepository {
  get(orderNumber: string): Promise<Order>;
}