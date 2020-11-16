import express, {Request, Response} from 'express';
const app = express();
const port: number = 3000;

// Data Models
interface Item {
  id: string;
  name: string;
  price: number;
}

interface Order {
  id: string;
  item: Item;
}

// Right Side Inside
interface OrderRepository {
  get(orderNumber: string): Promise<Order>
}

// Right Side Outside
class InMemoryOrderRepository implements OrderRepository {
  private readonly aFakeOrder: Order = {
    id: '123',
    item: {
      id: '1',
      name: 'EKG',
      price: 100
    }
  };

  async get(orderNumber: string): Promise<Order> {
    return this.aFakeOrder;
  }
}


// Business Logic / Center
class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async placeOrder(orderNumber: string): Promise<Item> {
    const order = await this.orderRepository.get(orderNumber);
    return order.item;
  }
}



// Left Side Outside
app.get("/checkout/:orderNumber", async (req: Request, res: Response) => {
  const inMemoryOrderRepository = new InMemoryOrderRepository();
  const orderService = new OrderService(inMemoryOrderRepository);
  const itemReturned = await orderService.placeOrder(req.params.orderNumber);
  const { name } = await itemReturned

  res.send(`Thanks for purchasing this item: ${name}`);
})

app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
})


