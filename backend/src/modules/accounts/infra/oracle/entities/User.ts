import { Entity, PrimaryColumn } from "typeorm";

@Entity("PCEMPR")
class User {
  @PrimaryColumn()
  matricula: string;

  nome: string;

  codfilial: string;

  senha: string;

  acesso: string;
}

export { User };
