import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import routes from './routes';
import { globalLimiter } from './middlewares/rateLimiter';
import { globalErrorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4321', 'http://localhost:5178', 'http://localhost:5179', 'http://localhost:5180'] }));
app.use(helmet({ crossOriginResourcePolicy: false })); // allow serving images across origins
app.use(globalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api', routes);

app.use(globalErrorHandler);

export default app;
