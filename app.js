var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var fs            = require('fs');
var socket_io     = require( "socket.io" );
var io            = socket_io();

var spawn = require('child_process').spawn;
var proc;
var vision;

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

app.get('/garagemaster', function(req, res) {
  res.sendFile(__dirname + '/public/jarvis1.html');
});

var sockets = {};

io.on('connection', function(socket) {

  sockets[socket.id] = socket;
  socket.emit('totalConnected', Object.keys(sockets).length);
  checkDoorStatus(io);

    socket.on('connect', function() {
        socket.emit('totalClients', totalClients);
    });

  socket.on('disconnect', function () {
    delete sockets[socket.id];
    io.emit('totalConnected', Object.keys(sockets).length);

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
    setTimeout(function() {
      door.writeSync(1);
    }, 2000);
    setTimeout(function () {
        checkDoorStatus(io);
    }, 5000);
  });

  setInterval(function(){
      // checkDoorStatus(io);
  }, 300000);

});

  function stopStreaming() {
    if (Object.keys(sockets).length == 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  }

  function checkDoorStatus(io) {
      // before we do anything let's make sure we did not just check
      var now = new Date().getTime();
      var stats = fs.statSync("vision.log");
      var endTime = new Date(stats.mtime).getTime() + 60000;
      // var mtime = new Date(util.inspect(stats.mtime));
      if(endTime > now) {
          // just pull last output
          fs.readFile('vision.log', 'utf8', function (err,data) {
              if (err) {
                  // return console.log(err);
              }
              io.sockets.emit('doorStatus', data);
          });
      } else {
        // grab an image
        var args = ["-w", "320", "-h", "240", "-q", "15", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "500", "-md", "5"];
        proc = spawn('raspistill', args);

        if (fs.existsSync('./stream/image_stream.jpg')) {
            var PythonShell = require('python-shell');
            var options = {
                mode: 'text',
                // pythonOptions: ['-u'],
                scriptPath: './garagevision',
                args: ['./stream/image_stream.jpg']
            };
            PythonShell.run('vision.py', options, function (err, results) {
                fs.readFile('vision.log', 'utf8', function (err, data) {
                    if (err) {
                        // return console.log(err);
                    }
                    io.sockets.emit('doorStatus', data);
                });
            });
        }
      }
  }

  function startStreaming(io) {

    if (app.get('watchingFile')) {
      io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
      return;
    }

    var args = ["-w", "320", "-h", "240", "-q", "15", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "500", "-md", "5"];
    proc = spawn('raspistill', args);

    app.set('watchingFile', true);

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
