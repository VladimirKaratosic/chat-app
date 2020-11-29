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

io.on('connection', () => {
    console.log("Connection created!");
})

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on a port ${PORT}`);
})