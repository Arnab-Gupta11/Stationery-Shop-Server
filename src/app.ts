import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app: Application = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://notefy-six.vercel.app'], // Allow only your production domain
  credentials: true, // Allow cookies to be sent
};

//Middleware to parse incoming JSON request
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//Application Routes
//Product related API endpoints
app.use('/api/v1', router);

//Base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Stationery Shop Server Live ⚡',
  });
});

//Not found route
app.use(notFound);
//Global Error Handler
app.use(globalErrorHandler);

export default app;
