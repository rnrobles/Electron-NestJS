import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePerfilDto,
  FilterPerfilDto,
  GetPerfilDto,
  UpdatePerfilDto,
} from '../dto/perfil.dto';
import { Perfil } from '../Perfil.entity';
import { PerfilService } from '../service/perfil.service';

@ApiTags(Perfil.name)
@Controller(Perfil.name.toLowerCase())
export class PerfilController {
  constructor(
    @InjectRepository(Perfil) private perfilRepo: Repository<Perfil>,
    private perfilService: PerfilService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista de ' + Perfil.name })
  @ApiResponse({
    status: 200,
    description: 'Lista de ' + Perfil.name,
    type: GetPerfilDto,
    isArray: true,
  })
  findAll(@Query() options?: FilterPerfilDto): Promise<GetPerfilDto[]> {
    console.log(options);
    return this.perfilService.findAll(options);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Registro de ' + Perfil.name })
  @ApiResponse({
    status: 200,
    description: 'Registro de ' + Perfil.name,
    type: Perfil,
  })
  find(@Param('id', ParseIntPipe) Id: number) {
    return this.perfilService.find(Id);
  }

  @Post()
  @ApiOperation({ summary: 'Nuevo registro de ' + Perfil.name })
  create(@Body() payload: CreatePerfilDto) {
    const base = new Perfil();
    base.ctrlActualizadoPor = 1;
    base.ctrlCreadoPor = 1;
    const register = { ...base, ...payload };

    return this.perfilRepo.save(register);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar registro de ' + Perfil.name })
  async update(@Param('id') id: number, @Body() payload: UpdatePerfilDto) {
    let registro = await this.perfilRepo.findOne(id);

    if (!registro) {
      return new HttpException('Registro no encontrado', 400);
    }

    registro = { ...registro, ...payload };

    registro.ctrlActualizadoPor = 2;
    registro.ctrlActualizado = new Date();
    const respuesta = await this.perfilRepo.update(id, registro);
    if (respuesta.affected > 0) {
      return registro;
    } else {
      return new HttpException('no se realizo la actualizacion', 100);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar registro de ' + Perfil.name })
  async delete(@Param('id') id: number) {
    const respuesta = await this.perfilService.delete(id);
    console.log(respuesta);
    return respuesta;
  }
}
