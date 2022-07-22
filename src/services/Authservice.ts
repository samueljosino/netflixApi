import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { RefreshToken } from "../entities/RefreshToken";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_CONFIG } from "../../enviroments/enviroments";
import dayjs from "dayjs";
import { AppError } from "../@types/AppError";

export class AuthService {
  static async login(name: string, password: string) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { name } });
    if (!user) {
      console.log("Usuario não encontrado!");
      return;
    }

    const isPasswordPass = await bcrypt.compare(password, user.password);
    if (!isPasswordPass) {
      return;
    }

    const token = AuthService.generateToken(user?.id);

    const refreshToken = await AuthService.createRefreshToken(user);

    return { user, token, refreshToken };
  }

  static generateToken(userId: number): string {
    const token = sign({ id: userId }, JWT_CONFIG.jwtSecret, {
      subject: String(userId),
      expiresIn: JWT_CONFIG.jwtSecretExpiresIn,
    });
    return token;
  }

  static async createRefreshToken(user: User) {
    const refreshTokenRepository = getRepository(RefreshToken);

    const expiresIn = dayjs()
      .add(JWT_CONFIG.jwtSecretExpiresIn, "seconds")
      .unix();

    const refreshToken = await refreshTokenRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (refreshToken) {
      refreshTokenRepository.merge(refreshToken, { expiresIn });
      await refreshTokenRepository.save(refreshToken);
      return refreshToken;
    }

    const newRefreshToken = refreshTokenRepository.create({
      user,
      expiresIn,
    });

    await refreshTokenRepository.save(newRefreshToken, {
      reload: true,
    });

    return newRefreshToken;
  }

  // * verificar se o token exite no banco
  // * se nao exisitr, retorna erro 403
  // * se existir, verificar se o refreshtoken ta expirado
  // * se o refreshtoken tiver expirado gera um erro 403 pro front que vai encaminhar para logout
  // * se refreshtoken nao tiver expirado, apenas gera um novo token e aumenta o tempo do e manda pro front

  static async createTokenFromRefreshToken(refreshTokenId: number) {
    const refreshTokenRepository = getRepository(RefreshToken);

    const refreshToken = await refreshTokenRepository.findOne({
      where: { id: refreshTokenId },
      relations: ["user"],
    });
    if (!refreshToken) {
      throw new AppError(403, "refreshToken nao existe!");
    }

    const refreshTokenIsExpired = dayjs
      .unix(refreshToken.expiresIn)
      .isBefore(dayjs());

    if (refreshTokenIsExpired) {
      throw new AppError(403, "refreshToken expirado");
    }
    const token = AuthService.generateToken(refreshToken.user.id);

    const expiresIn = dayjs()
      .add(JWT_CONFIG.jwtSecretExpiresIn, "seconds")
      .unix();

    refreshTokenRepository.merge(refreshToken, { expiresIn });
    await refreshTokenRepository.save(refreshToken);

    return { token, refreshToken, user: refreshToken.user };
  }
}
