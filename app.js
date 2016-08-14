var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var fs            = require('fs');
var socket_io     = require( "socket.io" );
var io            = socket_io();

var routes = require('./routes/index');
var garagedoor = require('./routes/garagedoor');

var spawn = require('child_process').spawn;
var proc;

var app = express();

// expose io to www
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup streaming URL
app.use('/', express.static(path.join(__dirname, 'stream')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/garagedoor', garagedoor);

app.get('/garagemaster', function(req, res) {
  res.sendFile(__dirname + '/public/jarvis1.html');
});

var sockets = {};

io.on('connection', function(socket) {

  sockets[socket.id] = socket;
  console.log("Total clients connected : ", Object.keys(sockets).length);

  socket.on('disconnect', function () {
    delete sockets[socket.id];

    // no more sockets, kill the stream
    if (Object.keys(sockets).length == 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  });

  socket.on('start-stream', function () {
    startStreaming(io);
  });

  socket.on('openclose-door', function () {
    // toggle the door remote
    var Gpio = require('onoff').Gpio,
    door = new Gpio(4, 'out');
    door.writeSync(0);
    console.log('Door open/close request');
    setTimeout(function() {
      door.writeSync(1);
    }, 2000);
  })

});

// http.listen(3001, function() {
//   console.log('Web sockets listening on *:3001');
// });

  function stopStreaming() {
    if (Object.keys(sockets).length == 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  }

  function startStreaming(io) {

    if (app.get('watchingFile')) {
      io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
      return;
    }

    var args = ["-w", "320", "-h", "240", "-q", "15", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "2000"];
    proc = spawn('raspistill', args);

    console.log('Watching for changes...');

    app.set('watchingFile', true);

    // setInterval(function(){
    //  if (app.get('watchingFile')) {
    //    io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    //  }
    //}, 500);

    fs.watchFile('./stream/image_stream.jpg', function (event, filename) {
      io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    })
  }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //  message: err.message,
  //   error: {}
  // });
});


module.exports = app;
