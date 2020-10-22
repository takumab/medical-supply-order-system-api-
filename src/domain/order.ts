// Defining the structure of what I'm modeling
// Data Models
interface Item  {
  id: string;
  name: string;
}

interface Order {
  id: string;
  item: Item;
}

// Business Logic or Inside
class OrderService {
  // Depedency Inversion
  constructor(private orderRepository: OrderRepository) {}

  async placeOrder(orderNumber: string): Promise<void> {
    const order = await this.orderRepository.get(orderNumber)
    console.log(order.item);
    console.log('Placing order');
  };
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
  const dynamoDBOrderRepository = new DynamoDBOrderRepository()
  const orderService = new OrderService(dynamoDBOrderRepository);

  orderService.placeOrder('123');
}

main();





