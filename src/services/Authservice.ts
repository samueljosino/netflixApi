import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { RefreshToken } from "../entities/RefreshToken";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_CONFIG } from "../../enviroments/enviroments";
import dayjs from "dayjs";

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

    const findRefreshToken = await refreshTokenRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (findRefreshToken) {
      refreshTokenRepository.merge(findRefreshToken, { expiresIn });
      await refreshTokenRepository.save(findRefreshToken);
      return findRefreshToken;
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
}
