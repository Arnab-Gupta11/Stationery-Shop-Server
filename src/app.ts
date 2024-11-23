import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.routes';
import { OrderRoutes } from './app/modules/order/order.routes';

const app: Application = express();
//Middleware to parse incoming JSON request
app.use(express.json());

//Application Routes
//Product related API endpoints
app.use('/api/products', ProductRoutes);
//Order related API endpoints
app.use('/api/orders', OrderRoutes);

//Base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Stationery Shop Server Live',
  });
});

//Fallback Route: hadle all undefined routes
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not Found',
  });
});

export default app;
