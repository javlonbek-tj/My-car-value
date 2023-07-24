import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password: string;
}
