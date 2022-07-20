import { getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Description } from "../entities/Description";
import { Movie } from "../entities/Movie";
import { CategoryService } from "./CategoryService";
import { DescriptionService } from "./DescriptionService";

export class MovieService {
  static async findAll() {
    const movieRepository = getRepository(Movie);
    const movies = await movieRepository.find({
      relations: ["description"],
    });
    return movies;
  }

  static async create(
    name: string,
    descriptionText: string,
    categoriesId: string[]
  ) {
    const categories = await CategoryService.find(categoriesId);

    const descriptionRepository = await getRepository(Description);
    const description: Description = await descriptionRepository.create({
      name: descriptionText,
    });
    await descriptionRepository.save(description);
    const movieRepository = getRepository(Movie);
    const movie = await movieRepository.create({
      name,
      description: description,
      categories,
    });

    movieRepository.save(movie);
    return movie;
  }

  static async update(id: number, name: string) {
    const movieRepository = getRepository(Movie);
    const movies = await movieRepository.findOne({ id });
    const moviesUpdated = movieRepository.merge(movies, { name });
    await movieRepository.save(moviesUpdated);
    console.log(movies, `alterado para ${moviesUpdated.name}`);
    return moviesUpdated;
  }

  static async delete(id: number) {
    const movieRepository = getRepository(Movie);
    const movies = await movieRepository.softRemove({ id });
    console.log(movies);
    return movies;
  }

  static async findById(id: number) {
    const movieRepository = getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
      // relations: [""],
    });
    return movie;
  }
}
