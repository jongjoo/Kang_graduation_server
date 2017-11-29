var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mysql = require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');
//var login = require('./routes/login');
var fire_up = require('./routes/kang_up');
var fire_down = require('./routes/kang_down');
var write = require('./routes/write');

var app = express();

// connection mysql
/*var client = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    port     : 3306 ,
});


client.query('USE Fire');
client.query('SELECT * FROM fire', function(error, result, fields){
  if(error){
    console.log('쿼리 문장에 오류가 있습니다.');
  }
  else {
    console.log(result);
  }
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/kang_up', fire_up);
app.use('/kang_down', fire_down);
app.post('/write', write);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
