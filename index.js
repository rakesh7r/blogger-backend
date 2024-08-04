const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const { db } = require('./db');
const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/blog', blogRouter);


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});