/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.route';
import { NextFunction } from 'express';
import globalErrorHandeler from './app/middleware/globalErrorHandeller';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());


app.use('/api/v1', router);


const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
}

app.get('/', test);

app.use(globalErrorHandeler);

//not found
app.use(notFound);

export default app;
