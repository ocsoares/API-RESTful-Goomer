import 'express-async-errors';
import express, { Request, Response } from "express";
import cors from "cors";
import morganMiddleware from "./middleware/morganMiddleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerJSON } from "./docs/swagger";
import { pageNotFound } from "./middleware/errorAPIMiddleware";
import { errorAPIMiddleware } from './middleware/errorAPIMiddleware';
import exampleRoute from './routes/exampleRoute';

const app = express();

app.use(express.json());

app.use(cors());

// Middlewares
app.use(morganMiddleware);

// Initial route (/) redirect to Documentation Route
app.get('/', (req: Request, res: Response): void => {
    return res.redirect('/api/docs');
});

// Documentation Route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

// Padroniza TODAS as Rotas para conter /api/... na URL !! <<
app.use('/api/',
    exampleRoute
);

app.use(pageNotFound);

// Para Funções ASSÍNCRONAS (async) PRECISA usar a lib 'express-async-errors' AQUI !! <<
app.use(errorAPIMiddleware);

export { app };