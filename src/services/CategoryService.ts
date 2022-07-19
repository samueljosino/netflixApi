import { getRepository } from "typeorm";
import { Category } from "../entities/Category";

export class CategoryService {
  static async findAll() {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.find();
    return category;
  }
  static async find(ids: number[] | string[]) {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.findByIds(ids);
    console.log(categories);
    return categories;
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
    const categoryRepository = getRepository(Category);
    const categorys = await categoryRepository.softRemove({ id });
    console.log(categorys);
    return categorys;
  }

  static async findById(id: number) {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id },
      //   relations: [""],
    });
    return category;
  }
}
