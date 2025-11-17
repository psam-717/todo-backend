import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import toDoRoutes from "./routes/todo.routes";
import userRoutes from "./routes/user.routes";
import healthRoute from "./routes/health.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(morgan('dev'));

//security headers with helmet
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(cookieParser()) // parses cookies from req headers and populates it
// it is crucial when storing tokens in cookies


// specify routes
app.use('/', healthRoute)
app.use('/api/todos', toDoRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

export default app;