import { getRepository } from "typeorm";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";

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
    return user;
  }
}
