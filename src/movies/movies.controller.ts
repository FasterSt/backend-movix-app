import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CinemaMovies } from './entities/cinemaMovies.entity';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Post()
    create(@Body() createMovieDto: CreateMovieDto): unknown {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    async getAllInCinemas(): Promise<CinemaMovies> {
        return await this.moviesService.getAllInCinemas();
    }

    @Get(':id')
    getMovieById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.getMovieById(+id);
    }
}
