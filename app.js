var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var cocktailsRouter = require('./routes/cocktails')
var reviewRouter = require('./routes/reviews')
// var oneTimeRouter = require('./routes/one-time')

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );

// app.use(
//     cors()
//   );

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
app.use('/cocktails', cocktailsRouter)
app.use('/reviews', reviewRouter)
// app.use('/one-time', oneTimeRouter)



mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
