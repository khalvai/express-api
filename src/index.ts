import express, { Express, Request, Response } from 'express';
import { authRouter } from './auth/auth.controller';
import bodyParser from 'body-parser';
import { errorHandler } from './error/error-handler';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use(errorHandler);
app.listen(3000, () => {
  console.log('server is running on port 3000');
});
