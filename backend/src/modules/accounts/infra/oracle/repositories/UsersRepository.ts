import { getRepository, Repository } from "typeorm";

import { User } from "@modules/accounts/infra/oracle/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByUserName(username: string): Promise<User> {
    const [user] = await this.repository.query(
      `SELECT   matricula "matricula",
      nome "nome",
      codfilial "codfilial",
      decrypt (senhabd, usuariobd) "senha",
      acesso "acesso"
FROM   pcempr, pccontro
WHERE       pcempr.matricula = pccontro.codusuario
      AND pccontro.acesso = 'S'
      AND pccontro.codrotina = 985009
      AND upper(nome_guerra) = upper('${username}')

UNION
SELECT   matricula "matricula",
      nome "nome",
      codfilial "codfilial",
      decrypt (senhabd, usuariobd) "senha",
      acesso "acesso"
FROM   pcempr, pccontro
WHERE       pcempr.matricula = pccontro.codusuario
      AND pccontro.acesso = 'N'
      AND pccontro.codrotina = 985009
      AND upper(nome_guerra) = upper('${username}')
      `
    );

    return user;
  }

  async findByMatricula(matricula: string): Promise<User> {
    const [user] = await this.repository.query(`
SELECT   matricula "matricula",
         nome "nome",
         situacao "situacao",
         codfilial "codfilial",
         usuariobd "usuariobd",
         decrypt (senhabd, usuariobd) "senha",
         funcao "funcao"
  FROM   pcempr
 WHERE   matricula IN (${matricula})
    `);

    return user;
  }
}

export { UsersRepository };
