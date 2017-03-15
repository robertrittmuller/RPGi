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
const aifileName = './stream/image_ai.jpg';
const streamingfileName = './stream/image_stream.jpg';

var app = express();

// expose io to www
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('garagevision', false);

// setup streaming URL
app.use('/', express.static(path.join(__dirname, 'stream')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// display the local UI
app.get('/RPGi', function(req, res) {
  res.sendFile(__dirname + '/public/RPGi.html');
});

// clean up any leftover files
if (fs.existsSync(aifileName)) {
    fs.unlink(aifileName);
}
if (fs.existsSync(streamingfileName)) {
    fs.unlink(streamingfileName);
}

var sockets = {};

// Start watching the door
startWatching();
var garagevision = setInterval(function() {
    if(!app.get('garagevision')) {
        startGarageVision();
    }
}, 15000);

io.on('connection', function(socket) {

    // on inital connection send some status updates
    sockets[socket.id] = socket;

    setTimeout(function() {
        socket.emit('totalConnected', Object.keys(sockets).length);
        sendDoorStatus();
    }, 2000);

    socket.on('disconnect', function () {
        delete sockets[socket.id];
        io.emit('totalConnected', Object.keys(sockets).length);

        // no more sockets, kill the stream and the garagevision watch
        if (Object.keys(sockets).length == 0) {
            app.set('streamingFile', false);
            fs.unwatchFile('vision.log');
            stopStreaming();
            startWatching();
        }
    });

    socket.on('start-stream', function () {
        stopWatching();
        startStreaming(io);
    });

    // setup file watch for out from GarageVision
    fs.watchFile('vision.log', function (event, filename) {
        fs.readFile('vision.log', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            io.sockets.emit('doorStatus', data);
        });
    });

    socket.on('openclose-door', function () {
        // toggle the door remote
        var Gpio = require('onoff').Gpio,
            door = new Gpio(4, 'out');
        door.writeSync(0);
        setTimeout(function() {
            door.writeSync(1);
        }, 2000);
    });
});

function sendDoorStatus() {
    // pull status from the file and return it
    fs.readFile('vision.log', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        io.sockets.emit('doorStatus', data);
    });
}

function startStreaming(io) {

    stopWatching();

    if (app.get('streamingFile')) {
        io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    } else {
        console.log('starting...');
        var args = ["-w", "320", "-h", "240", "-q", "15", "-o", streamingfileName, "-t", "999999999", "-tl", "500", "-md", "5"];
        proc = spawn('raspistill', args);

        app.set('streamingFile', true);

        fs.watchFile(streamingfileName, function (event, filename) {
            io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
        })
    }
}

function startWatching() {

    stopStreaming();

    var args = ["-w", "320", "-h", "240", "-q", "15", "-o", aifileName, "-t", "999999999", "-tl", "15000", "-md", "5"];
    proc = spawn('raspistill', args);

    app.set('watchingFile', true);

}

function stopWatching() {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile(aifileName);
}

function stopStreaming() {
    if (Object.keys(sockets).length == 0) {
        app.set('streamingFile', false);
        if (proc) proc.kill();
        fs.unwatchFile(streamingfileName);
        if(fs.existsSync(streamingfileName)) {
            fs.unlink(streamingfileName);
        }
    }
}

function startGarageVision() {

    app.set('garagevision', true);

    var PythonShell = require('python-shell');
    var options = {
        mode: 'text',
        scriptPath: './garagevision',
        args: [aifileName]
    };
    PythonShell.run('vision.py', options, function (err, results) {
        app.set('garagevision', false);
    });
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
