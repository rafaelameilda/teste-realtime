import WebSocket from "ws";

interface IParametersOnMessageSocket {
  data: WebSocket.RawData;
  ws: WebSocket;
  wss: WebSocket.Server;
}

const onMessage = ({ data, ws, wss }: IParametersOnMessageSocket): void => {
  const { broadcast, dados } = JSON.parse(data.toString());
  wss.clients.forEach((client) => {
    if (broadcast) {
      if (client !== ws) {
        client.send(JSON.stringify(dados));
      } else {
        ws.send(`voce enviou para os outros`);
      }
    }
  });
};

export { onMessage };
