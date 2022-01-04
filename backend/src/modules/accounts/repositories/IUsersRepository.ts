import { User } from "../infra/oracle/entities/User";

interface IUsersRepository {
  findByUserName(username: string): Promise<User>;
  findByMatricula(matricula: string): Promise<User>;
}

export { IUsersRepository };
