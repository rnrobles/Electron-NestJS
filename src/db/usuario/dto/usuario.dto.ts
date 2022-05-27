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
  IsEnum,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePerfilDto } from 'src/db/perfil/dto/perfil.dto';

export enum UserRole {
  Admin = 1 as number,
  Moderator = 2 as number,
  User = 3 as number,
}

export class UsuarioPost {
  @ApiProperty({ default: 'nombre' })
  @IsString()
  nombre: string;

  @ApiProperty({ default: 'usuario' })
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'test@gmail.com' })
  @IsString()
  correo: string;

  @ApiProperty({ required: true, default: UserRole.Admin })
  @IsEnum(UserRole)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  perfilId: number;
}

export class UsuarioPut extends PartialType(UsuarioPost) {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsPositive()
  usuarioId: number;
}

export class UsuarioGet {
  @ApiProperty()
  usuarioId: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  usuario: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  perfilId: CreatePerfilDto;
}

export class UsuarioFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Min(0)
  offset: number;

  @ApiProperty({
    required: false,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  @IsOptional()
  perfil: string;
}
