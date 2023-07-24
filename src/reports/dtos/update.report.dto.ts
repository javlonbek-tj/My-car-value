import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReportDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  make: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(1930)
  @Max(2050)
  year: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @ApiProperty({ required: false })
  @IsLongitude()
  @IsOptional()
  lng: number;

  @ApiProperty({ required: false })
  @IsLatitude()
  @IsOptional()
  lat: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1000000)
  price: number;
}
