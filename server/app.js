const createError = require('http-errors');
const express = require('express');
const http = require("http");
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up socketio variable to emit and receive messages to clients
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log(`user connected with: ${socket.id}`);

  //Allow socket.io to join a room
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  //Create a socket.io event to send the message to the server
  socket.on("send-message", (data) => {
    console.log(`Sending message data`)
    socket.timeout(data.room).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected with id: ${socket.id}`);
  });
});

app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.send('error');
  });


module.exports = app;
