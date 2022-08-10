#!/usr/bin/env node

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { onConnection } = require('./private/socketHandler.js');

let args = process.argv.slice(2);

if (!args[0] || !args[0][0] || args[0][0] == '-') return console.log("You must give a port. (Example: `node server.js 3000`).");

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || args[0];
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static('public'));

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});

io.on("connection", onConnection);
