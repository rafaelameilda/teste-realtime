const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    const data = JSON.parse(message);
    console.log(data);
    ws.send(`Hello, voce recebeu do backend -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send("conectou no  WebSocket server");
});

//start our server
server.listen(8999, () => {
  console.log(`Server started on port  :8999)`);
});
