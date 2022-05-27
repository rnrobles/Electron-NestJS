import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
  IsEnum,
} from 'class-validator';

import { PartialType, ApiProperty, ApiQuery } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Min(0)
  offset: number;
}
