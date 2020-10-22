
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import connectDb from '@/infra/database/mongodb'

import { v1Router } from './api/v1';

const app = express();

const origin = {
  origin: '*',
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(helmet());
app.use(morgan('combined'));

app.use('/api/v1', v1Router);

(async () => {
  await connectDb();
  app.listen(process.env.PORT || 9044, () => {
    console.log(`[App]: Server listening on 9044`)
  })
})();

export { app };