import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Collection {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    poster_path: string;

    @IsString()
    @IsNotEmpty()
    backdrop_path: string;
}
