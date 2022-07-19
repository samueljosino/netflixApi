import { getRepository } from "typeorm";
import { Description } from "../entities/Description";

export class DescriptionService {
  static async findAll() {
    const descriptionRepository = getRepository(Description);
    const description = await descriptionRepository.find();
    return description;
  }

  static async create(name: string) {
    const descriptionRepository = getRepository(Description);
    const categories = descriptionRepository.create({ name });
    descriptionRepository.save(categories);
    console.log(categories);
    return categories;
  }

  static async update(id: number, name: string) {
    const descriptionRepository = getRepository(Description);
    const categories = await descriptionRepository.findOne({ id });
    const categoriesUpdated = descriptionRepository.merge(categories, { name });
    await descriptionRepository.save(categoriesUpdated);
    console.log(categories, `alterado para ${categoriesUpdated.name}`);
    return categoriesUpdated;
  }

  static async delete(id: number) {
    const musicianRepository = getRepository(Description);
    const musicians = await musicianRepository.softRemove({ id });
    console.log(musicians);
    return musicians;
  }

  static async findById(id: number) {
    const musicianRepository = getRepository(Description);
    const musician = await musicianRepository.findOne({
      where: { id },
      //   relations: [""],
    });
    return musician;
  }
}
