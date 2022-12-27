import 'express-async-errors';
import express, { Request, Response } from "express";
import cors from "cors";
import morganMiddleware from "./middleware/morganMiddleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerJSON } from "./docs/swagger";
import { pageNotFound } from "./middleware/errorAPIMiddleware";
import { errorAPIMiddleware } from './middleware/errorAPIMiddleware';
import authRoute from './routes/authRoute';

const app = express();

app.use(express.json());

app.use(cors());

app.use(morganMiddleware);

// Initial route (/) redirect to Documentation Route
app.get('/', (req: Request, res: Response): void => {
    return res.redirect('/api/docs');
});

// Documentation Route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

// All routes use /api as parameter !
app.use('/api/',
    authRoute
);

app.use(pageNotFound);

// HTTP Errors (to use express-async-errors lib !)
app.use(errorAPIMiddleware);

export { app };