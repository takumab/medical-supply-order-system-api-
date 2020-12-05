// Data models/Domain models (move into own folder)
export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  item: Product | Product[];
  total: number;
}

// Right side Inside (Port)
export interface OrderRepository {
  get(orderNumber: string): Promise<Order>;
}