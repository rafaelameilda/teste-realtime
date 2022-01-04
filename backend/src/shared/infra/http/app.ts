import "reflect-metadata";
import "dotenv/config";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import WebSocket from "ws";

import "express-async-errors";

import { onMessage } from "@modules/teste/useCases/teste";
import { AppError } from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import createConnections from "@shared/infra/oracle";

import { router } from "./routes";

import "@shared/container";

createConnections();

const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use(cors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
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
