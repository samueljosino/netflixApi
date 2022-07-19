import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class UserService {
  static async findAll() {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return users;
  }

  static async create(name: string) {
    const userRepository = getRepository(User);
    const users = userRepository.create({ name });
    userRepository.save(users);
    console.log(users);
    return users;
  }

  static async update(id: number, name: string) {
    const userRepository = getRepository(User);
    const users = await userRepository.findOne({ id });
    const usersUpdated = userRepository.merge(users, { name });
    await userRepository.save(usersUpdated);
    console.log(users, `alterado para ${usersUpdated.name}`);
    return usersUpdated;
  }

  static async delete(id: number) {
    const userRepository = getRepository(User);
    const users = await userRepository.softRemove({ id });
    console.log(users);
    return users;
  }

  static async findById(id: number) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
      //   relations: [""],
    });
    return user;
  }
}
