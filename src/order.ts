import express, {Request, Response} from 'express';
const app = express();
import AWS from 'aws-sdk';
const port: number = 3000;
const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

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

// Right Side Inside (Port)
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

class DynamoDBOrderRepository implements OrderRepository {
  async get(orderNumber: string): Promise<Order> {
    const params = {
      Key: {
        "id": {
          S: `${orderNumber}`
        }
      },
      TableName: "orders"
    };
    const order = await dynamoDb.getItem(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else return data
    }).promise();
    const item: Item = {
      id: order.Item!.item.M!.id.S!,
      name: order.Item!.item.M!.name.S!,
      price: parseInt(order.Item!.item.M!.price.N!),
    }
    return { id: order.Item!.id.S!, item  }
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
  // const inMemoryOrderRepository = new InMemoryOrderRepository();
  const dynamoDBOrderRepository = new DynamoDBOrderRepository();
  const orderService = new OrderService(dynamoDBOrderRepository);
  const itemReturned = await orderService.placeOrder(req.params.orderNumber);
  const { name } = await itemReturned

  res.send(`Thanks for purchasing this item: ${name}`);
})

app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
})


