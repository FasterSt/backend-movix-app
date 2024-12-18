import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Res,
    HttpCode,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CinemaMovies } from './entities/cinemaMovies.entity';
import { Movie } from './entities/movie.entity';
import { Response } from 'express';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Post()
    create(@Body() createMovieDto: CreateMovieDto): unknown {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    @HttpCode(200)
    async getAllInCinemas(@Res() res: Response): Promise<void> {
        const movies = await this.moviesService.getAllInCinemas();
        res.json({
            data: movies,
        });
    }

    @Get(':id')
    getMovieById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.getMovieById(+id);
    }
}
