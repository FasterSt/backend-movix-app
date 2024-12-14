import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CinemaMovies } from './entities/cinemaMovies.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    create(createMovieDto: CreateMovieDto) {
        return 'This action adds a new movie';
    }

    async getAllInCinemas(
        locale: 'en-US' | 'es-ES' = 'en-US',
    ): Promise<CinemaMovies> {
        const response = await fetch(
            `${process.env.TMDB_API_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=${locale}&page=1`,
        );
        const data: CinemaMovies = await response.json();

        const movies = {
            ...data,
            results: data.results.map((movie) => ({
                ...movie,
                backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            })),
        };

        return movies;
    }

    async getMovieById(
        id: number,
        locale: 'en-US' | 'es-ES' = 'en-US',
    ): Promise<Movie> {
        const response = await fetch(
            `${process.env.TMDB_API_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=${locale}`,
        );
        const movie: Movie = await response.json();
        return movie;
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return `This action updates a #${id} movie`;
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }
}
