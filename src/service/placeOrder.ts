import { Order, Product } from '../domain/model/order';

interface OrderReader {
  read(order: Order): Product[];
}

class JsonFileOrderRead {
  read(order: Order): Product[] {
    return [];
  }
}

class XmlFileOrderRead {
  read(order: Order): Product[] {
    return [];
  }
}

function main() {
  const orderReader = new XmlFileOrderRead();
  const order: Order = {
    address: "",
    id: 123,
    product: {},
  };
  readOrder(orderReader, order);
}

function readOrder(orderReader: OrderReader, order: Order) {
  let productList = orderReader.read(order);
  console.log(productList);
}