import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Companies {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @IsString()
    logo_path: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    origin_country: string;
}
