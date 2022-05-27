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
  IsEmail,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FilterDto } from 'src/db/_dto/filter.dto';

export class CreatePerfilDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  descripcion: string;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {
  /*  @ApiProperty()
  @IsNumber()
  perfilId: number; */
}

export class GetPerfilDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  perfilId: number;
}

export class FilterPerfilDto extends FilterDto {}
