import express from 'express';
import 'dotenv/config';
import { db } from './libs/dbConnect.js';
import userRouter from './routes/user.route.js';
import {errorHandler} from './libs/middleware.js';

const app = express();
const PORT = 3000;

app.use('/' , userRouter);
app.use('*' , (req, res) => {
  res.status(404).json({message: 'not found'});
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
