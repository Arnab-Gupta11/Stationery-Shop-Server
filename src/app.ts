import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.routes';

const app: Application = express();
//Parser
app.use(express.json());

//Application Routes
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Stationery Shop Server Live',
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not Found',
  });
});

export default app;
