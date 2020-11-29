// const path = require("path");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
const router = require('./router');

app.use(router);

const getDate = () => {
  const D = new Date().toString().split(" ");
  const hh_mm_ss = D[4].split(':');
  const hh_mm = [hh_mm_ss[0], hh_mm_ss[1]].join(":");
  const time = `${D[2]} ${D[1]} ${D[3]} ${hh_mm}`;
  return time;
}

io.on('connection', socket => {
    console.log("Connection created!");
    socket.on('message', ({message, author}) => {
      io.emit('chat', {message, author, timeStamp: getDate()});
  })
})

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on a port ${PORT}`);
})