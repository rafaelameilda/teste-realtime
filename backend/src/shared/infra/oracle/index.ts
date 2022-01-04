import { Connection, createConnections } from "typeorm";

export default async (): Promise<Connection[]> => {
  const connections = await createConnections();

  return connections;
};
