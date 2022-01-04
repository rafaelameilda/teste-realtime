import "reflect-metadata";
import "dotenv/config";

import cors from "cors";
import express from "express";
import http from "http";
import WebSocket from "ws";

import "express-async-errors";
import "@database/connection";

import { onMessage } from "@modules/teste/useCases/teste";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import { errorHandler } from "./errors/handler";
import { router } from "./routes";

import "@shared/container";

const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use(cors());
app.use(router);

app.use(errorHandler);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", function chama(data) {
    onMessage({ data, ws, wss });
  });

  // const ip = req.socket.remoteAddress;
  // console.log(ip);

  // ws.on("close", function saiu() {
  //   console.log("disconnect");
  // });

  // console.log("conectou");
});

export { server };
