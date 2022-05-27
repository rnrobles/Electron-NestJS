import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from 'src/db/perfil/Perfil.entity';
import { ErrorResponse } from 'src/filter/error.model';
import { Repository } from 'typeorm';
import {
  UsuarioFilter,
  UsuarioGet,
  UsuarioPost,
  UsuarioPut,
} from '../dto/usuario.dto';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../Usuario.entity';

@ApiTags(Usuario.name)
@Controller(Usuario.name.toLowerCase())
@Catch()
export class UsuarioController {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Perfil) private perfilRepo: Repository<Perfil>,
    private usuarioService: UsuarioService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista de ' + Usuario.name })
  @ApiResponse({
    status: 200,
    description: 'Lista de ' + Usuario.name,
    type: UsuarioGet,
    isArray: true,
  })
  findAll(@Query() options?: UsuarioFilter): Promise<UsuarioGet[]> {
    console.log(options);
    return this.usuarioService.findAll(options);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Registro de ' + Usuario.name })
  @ApiResponse({
    status: 202,
    description: 'Registro de ' + Usuario.name,
    type: UsuarioGet,
  })
  @ApiResponse({
    status: 404,
    description: 'Registro no encontrado ',
    type: ErrorResponse,
  })
  find(@Param('id', ParseIntPipe) Id: number) {
    console.log('id:' + Id);
    return this.usuarioService.find(Id);
  }

  @Post()
  @ApiOperation({ summary: 'Nuevo registro de ' + Usuario.name })
  @ApiResponse({
    status: 400,
    description: 'BadRequestException ',
  })
  @ApiResponse({
    status: 201,
    description: 'Registro de ' + Usuario.name,
    type: UsuarioGet,
  })
  async create(@Body() payload: UsuarioPost) {
    const base = new Usuario();
    base.ctrlActualizadoPor = 1;
    base.ctrlCreadoPor = 1;

    if (payload.perfilId) {
      const perfil = await this.perfilRepo.findOne(payload.perfilId);
      base.perfilIdPerfil = perfil;
    }
    const register = { ...payload, ...base };
    const temp = await this.usuarioRepo.save(register);
    return temp;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar registro de ' + Usuario.name })
  @ApiResponse({
    status: 201,
    description: 'Registro de ' + Usuario.name,
    type: UsuarioGet,
  })
  update(@Param('id') id: number, @Body() payload: UsuarioPut) {
    return this.usuarioRepo.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar registro de ' + Usuario.name })
  async delete(@Param('id') id: number) {
    const respuesta = await this.usuarioService.delete(id);
    return { Estatus: respuesta.ctrlActivo };
  }
}
