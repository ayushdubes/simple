import express from 'express';
import 'dotenv/config';
import { db } from './libs/dbConnect.js';
import userRouter from 

const app = express();
const PORT = 3000;

app.use('/' , (req, res) => {
  res.status(200).json({message: 'Hello World'});
});
app.use('*' , (req, res) => {
  res.status(404).json({message: 'not found'});
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
