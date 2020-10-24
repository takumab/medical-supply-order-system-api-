// Defining the structure of what I'm modeling
// Data Models
interface Item {
  id: string;
  name: string;
}

interface Order {
  id: string;
  item: Item;
}

// Business Logic or Inside
class OrderService {
  // Dependency Inversion
  constructor(private orderRepository: OrderRepository) {}

  async placeOrder(orderNumber: string): Promise<void> {
    const order = await this.orderRepository.get(orderNumber);
    console.log(order.item);
    console.log('Placing order');
  }
}
// Driven Port
// A part of the domain
interface OrderRepository {
  get(orderNumber: string): Promise<Order>;
}

// Above this line is my Business Logic

// --------------------------------------------------------------

// Below is this line is outside of the Hexagon which we call the Adapters

// Right Side

// InMemoryOrderRepository
class InMemoryOrderRepository implements OrderRepository {
  private readonly anOrder: Order = {
    id: '135',
    item: { id: '1', name: 'Black Gloves' }
  };

  async get(orderNumber: string): Promise<Order> {
    if (this.anOrder.id !== orderNumber) {
      throw new Error(`${orderNumber} does not exist!`);
    }
    return this.anOrder;
  }
}

// DynamoDBOrderRepository
class DynamoDBOrderRepository implements OrderRepository {
  async get(orderNumber: string): Promise<Order> {
    return {
      id: '123',
      item: { id: '1', name: 'Glasses' }
    };
  }
}

// Left side (CLI, HTTP, etc)
function main() {
  const dynamoDBOrderRepository = new DynamoDBOrderRepository();
  const orderService = new OrderService(dynamoDBOrderRepository);

  const inMemoryOrderRepository = new InMemoryOrderRepository();
  const orderServiceTwo = new OrderService(inMemoryOrderRepository);

  orderService.placeOrder('123');

  orderServiceTwo.placeOrder('135');
}


main();
