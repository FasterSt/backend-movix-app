import { IsNotEmpty, IsString } from 'class-validator';

export class productionContries {
    @IsString()
    @IsNotEmpty()
    iso_3166_1: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
