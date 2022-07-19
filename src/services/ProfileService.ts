import { getRepository } from "typeorm";
import { Profile } from "../entities/Profile";

export class ProfileService {
  static async findAll() {
    const profileRepository = getRepository(Profile);
    const profiles = await profileRepository.find();
    return profiles;
  }

  static async create(name: string) {
    const profileRepository = getRepository(Profile);
    const profiles = profileRepository.create({ name });
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
    const musicianRepository = getRepository(Profile);
    const musicians = await musicianRepository.softRemove({ id });
    console.log(musicians);
    return musicians;
  }

  static async findById(id: number) {
    const musicianRepository = getRepository(Profile);
    const musician = await musicianRepository.findOne({
      where: { id },
      //   relations: [""],
    });
    return musician;
  }
}
