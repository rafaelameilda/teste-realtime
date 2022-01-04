import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    nome: string;
    matricula: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUserName(username);

    if (!user) {
      throw new AppError(
        "User does not have permission on Rotina 530 (985009)!"
      );
    }

    const passwordMatch = password?.toUpperCase() === user.senha?.toUpperCase();

    if (!passwordMatch) {
      throw new AppError("Username or password incorrect!");
    }

    if (user.acesso === "N") {
      throw new AppError(
        "User does not have permission on Rotina 530 (985009)!"
      );
    }

    const token = sign({}, auth.secret_token, {
      subject: user.matricula.toString(),
      expiresIn: auth.expires_in_token,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        matricula: user.matricula,
        nome: user.nome,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
