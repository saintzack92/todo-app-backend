import express, {
  Express
} from 'express';

import { Task } from './src/tasks/task.entity';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import { taskRouter } from './src/tasks/task.router';

// Instantiate express app
export const app: Express = express();
dotenv.config();

//parse request body
app.use(bodyParser.json())

//use cors install types as well
app.use(cors())

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities:[Task],
  synchronize: true,
});

// Define sever port
const port = process.env.PORT;

// Create a default route.
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });



AppDataSource.initialize()
  .then(() => {
    // Start listenting to the requests on the defined port
    app.listen(port);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization',
      err,
    );
  });
  app.use('/',taskRouter)
