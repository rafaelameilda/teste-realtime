import WebSocket from "ws";

interface IParametersOnMessageSocket {
  data: WebSocket.RawData;
  ws: WebSocket;
  wss: WebSocket.Server;
}

const onMessage = ({ data, ws, wss }: IParametersOnMessageSocket): void => {
  const dados = JSON.parse(data.toString());
  wss.clients.forEach((client) => {
    if (dados.broadcast) {
      if (client !== ws) {
        client.send(JSON.stringify(dados));
      } else {
        ws.send(JSON.stringify({ mensagem: `voce enviou para os outros` }));
      }
    }
  });
};

export { onMessage };
