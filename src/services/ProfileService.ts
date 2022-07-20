import { getRepository } from "typeorm";
import { Profile } from "../entities/Profile";
import { UserService } from "./UserService";

export class ProfileService {
  static async findAll() {
    const profileRepository = getRepository(Profile);
    const profiles = await profileRepository.find();
    console.log(profiles);
    return profiles;
  }

  static async create(name: string, userId: number) {
    const user = await UserService.findById(userId);
    if (!user) {
      throw new Error("Esse userId não existe!");
    }
    const profileRepository = getRepository(Profile);
    const profiles = profileRepository.create({ name, user });
    profileRepository.save(profiles);
    console.log(profiles);
    return profiles;
  }

  static async update(id: number, name: string) {
    const profileRepository = getRepository(Profile);
    const profiles = await profileRepository.findOne({ id });
    const profilesUpdated = profileRepository.merge(profiles, { name });
    await profileRepository.save(profilesUpdated);
    console.log(profiles, `alterado para ${profilesUpdated.name}`);
    return profilesUpdated;
  }

  static async delete(id: number) {
    const profileRepository = getRepository(Profile);
    const profiles = await profileRepository.softRemove({ id });
    console.log(profiles);
    return profiles;
  }

  static async findById(id: number) {
    const profileRepository = getRepository(Profile);
    const profile = await profileRepository.findOne({
      where: { id },
      //   relations: [""],
    });
    return profile;
  }
}
