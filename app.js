var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var config = require('./config/index.js').default;

var logModel = require('./service/log-service')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/message');
var houseRouter = require('./routes/house');
var marketRouter = require('./routes/market');
var logRouter = require('./routes/log');
var uploadRouter = require('./routes/upload');

var app = express();

var db = mongoose.connect(config.dbUrl)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Cache-Control', ' no-store')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(function (req, res, next) {
  if(req.method == 'OPTIONS'){
    res.sendStatus(200).end()
  }else if(req.method == 'POST' || req.method == 'DELETE' || req.method == 'PUT'){
    var doc = {
      time: new Date().toLocaleString(),
      api: req.originalUrl,
      method: req.method,
      body: req.body,
      params: req.query,
    }
    var logEntity = new logModel(doc)
    logEntity.save(function (error) {
    })
  }
  next()
})

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', messagesRouter);
app.use('/', houseRouter);
app.use('/', marketRouter);
app.use('/', logRouter);
app.use('/', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
