import express, { type Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './features/user/user.routes.js';
import { timeTraceAPIKeyMiddleware as timeTraceAPIKey } from './core/middlewares/time-trace-api-key.middleware.js';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(timeTraceAPIKey);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app);

app.listen(process.env.PORT, () => console.log(`Server running at port [${process.env.PORT}]`));
