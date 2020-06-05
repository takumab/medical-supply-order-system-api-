import { Controller } from './Controller';

interface IGetSalesListQuery {
}

interface IGetSalesDetailQuery {
}

interface ICreateSaleViewModelFactory {
}

interface ICreateSaleCommand {
}

export class SalesController implements Controller {
  private salesListQuery: IGetSalesListQuery;
  private saleDetailQuery: IGetSalesDetailQuery;
  private factory: ICreateSaleViewModelFactory;
  private createCommand: ICreateSaleCommand;
  constructor(
    salesListQuery: IGetSalesListQuery,
    saleDetailQuery: IGetSalesDetailQuery,
    factory: ICreateSaleViewModelFactory,
    createCommand: ICreateSaleCommand
  ) {
    this.salesListQuery = salesListQuery;
    this.saleDetailQuery = saleDetailQuery;
    this.factory = factory;
    this.createCommand = createCommand;
  }
}
