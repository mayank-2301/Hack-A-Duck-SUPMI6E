const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  //console.log(req.cookies.token);
  next();
});
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  console.log(req.originalUrl);
  next(new Error('Not Found'));
});
app.use((err, req, res, next) => {
  console.log('err detected', err.message);
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
});
module.exports = app;
