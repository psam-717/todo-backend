import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import toDoRoutes from "./routes/todo.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();

app.use(morgan('dev'));

//security headers with helmet
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "50mb"}));


// specify routes
app.use('/api/todos', toDoRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

export default app;