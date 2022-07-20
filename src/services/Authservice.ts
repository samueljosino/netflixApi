import { getRepository } from "typeorm";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_CONFIG } from "../../enviroments/enviroments";

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

    return { user, token };
  }

  static generateToken(userId: number): string {
    const token = sign({ id: userId }, JWT_CONFIG.jwtSecret, {
      subject: String(userId),
      expiresIn: JWT_CONFIG.jwtSecretExpiresIn,
    });
    return token;
  }
}
