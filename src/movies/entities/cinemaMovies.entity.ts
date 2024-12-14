import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { MovieBase } from './movie.entity';

class MoviesResult extends MovieBase {
    @IsArray()
    @IsNotEmpty()
    @IsNumber()
    genre_ids: number[];
}

class DatesMinMax {
    @IsDate()
    @IsNotEmpty()
    maximum: number;

    @IsDate()
    @IsNotEmpty()
    minimum: number;
}

export class CinemaMovies {
    @ValidateNested()
    dates: DatesMinMax;

    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ValidateNested()
    results: MoviesResult[];

    @IsNumber()
    @IsNotEmpty()
    total_pages: number;

    @IsNumber()
    @IsNotEmpty()
    total_results: number;
}
