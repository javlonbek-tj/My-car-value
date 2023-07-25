import { ApiProperty } from '@nestjs/swagger';
import { Expose} from 'class-transformer';

export class ReportDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  make: string;

  @ApiProperty()
  @Expose()
  model: string;

  @ApiProperty()
  @Expose()
  year: number;

  @ApiProperty()
  @Expose()
  mileage: number;

  @ApiProperty()
  @Expose()
  lng: number;

  @ApiProperty()
  @Expose()
  lat: number;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  approved: boolean;

  @ApiProperty()
  @Expose()
  userId: number;
}
