import {
    ArrayContains,
    IsArray,
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Collection } from './collection.entity';
import { Genres } from './genres.entity';
import { Companies } from './companies.entity';
import { productionContries } from './productContries.entity';

export class MovieBase {
    @IsBoolean()
    @IsNotEmpty()
    adult: boolean;

    @IsString()
    @IsNotEmpty()
    backdrop_path: string;

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    original_language: string;

    @IsString()
    @IsNotEmpty()
    original_title: string;

    @IsString()
    @IsNotEmpty()
    overview: string;

    @IsNumber()
    @IsNotEmpty()
    popularity: number;

    @IsString()
    @IsNotEmpty()
    poster_path: string;

    @IsString()
    @IsNotEmpty()
    release_date: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsNotEmpty()
    video: boolean;

    @IsNumber()
    @IsNotEmpty()
    vote_average: number;

    @IsNumber()
    @IsNotEmpty()
    vote_count: number;
}

class SpokenLanguages {
    @IsString()
    @IsNotEmpty()
    english_name: string;

    @IsString()
    @IsNotEmpty()
    iso_639_1: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class Movie extends MovieBase {
    @ValidateNested()
    belongs_to_collection: Collection;

    @IsNumber()
    @IsNotEmpty()
    budget: number;

    @ValidateNested()
    genres: Genres[];

    @IsString()
    @IsNotEmpty()
    homepage: string;

    @IsString()
    @IsNotEmpty()
    imdb_id: string;

    @ArrayContains(['US', 'CA', 'AU', 'DE', 'FR', 'GB', 'IT', 'JP', 'ES'])
    origin_country: string[];

    @ValidateNested()
    production_companies: Companies[];

    @ValidateNested()
    production_countries: productionContries[];

    @IsNumber()
    @IsNotEmpty()
    revenue: number;

    @IsNumber()
    @IsNotEmpty()
    runtime: number;

    @ValidateNested()
    spoken_languages: SpokenLanguages[];

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    tagline: string;
}
