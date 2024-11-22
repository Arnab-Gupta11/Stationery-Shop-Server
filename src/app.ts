import express, { Application, Request, Response } from 'express';

const app: Application = express();
//Parser
app.use(express.json());

//Application Routes
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
