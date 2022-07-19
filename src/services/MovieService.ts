import { getRepository } from "typeorm";
import { Description } from "../entities/Description";
import { Movie } from "../entities/Movie";
import { DescriptionService } from "./DescriptionService";

export class MovieService {
  static async findAll() {
    const movieRepository = getRepository(Movie);
    const movies = await movieRepository.find({
      relations: ["description"],
    });
    return movies;
  }

  static async create(name: string, descriptionText: string) {
    const descriptionRepository = await getRepository(Description);
    const description: Description = await descriptionRepository.create({
      name: descriptionText,
    });
    await descriptionRepository.save(description);
    const movieRepository = getRepository(Movie);
    const movie = await movieRepository.create({
      name,
      description: description,
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
    const musicianRepository = getRepository(Movie);
    const musicians = await musicianRepository.softRemove({ id });
    console.log(musicians);
    return musicians;
  }

  static async findById(id: number) {
    const musicianRepository = getRepository(Movie);
    const musician = await musicianRepository.findOne({
      where: { id },
      //   relations: [""],
    });
    return musician;
  }
}
