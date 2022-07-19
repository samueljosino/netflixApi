import { getRepository } from "typeorm";
import { Category } from "../entities/Category";

export class CategoryService {
  static async findAll() {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.find();
    return category;
  }

  static async create(name: string) {
    const categoryRepository = getRepository(Category);
    const categories = categoryRepository.create({ name });
    categoryRepository.save(categories);
    console.log(categories);
    return categories;
  }

  static async update(id: number, name: string) {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.findOne({ id });
    const categoriesUpdated = categoryRepository.merge(categories, { name });
    await categoryRepository.save(categoriesUpdated);
    console.log(categories, `alterado para ${categoriesUpdated.name}`);
    return categoriesUpdated;
  }

  static async delete(id: number) {
    const musicianRepository = getRepository(Category);
    const musicians = await musicianRepository.softRemove({ id });
    console.log(musicians);
    return musicians;
  }

  static async findById(id: number) {
    const musicianRepository = getRepository(Category);
    const musician = await musicianRepository.findOne({
      where: { id },
      //   relations: [""],
    });
    return musician;
  }
}
