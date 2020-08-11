import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
// import AppError from '@shared/errors/AppError';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    // TODO
    try {
      const { id } = request.params;

      const findOrder = container.resolve(FindOrderService);

      const foundOrder = await findOrder.execute({
        id,
      });

      return response.json(foundOrder);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    try {
      const { customer_id, products } = request.body;

      const createOrder = container.resolve(CreateOrderService);

      const order = await createOrder.execute({
        customer_id,
        products,
      });

      return response.json(order);
    } catch (err) {
      // throw new AppError('Erro na Order', 400);
      return response.status(400).json({ error: err.message });
    }
  }
}
