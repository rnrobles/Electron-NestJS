import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//entitys
import { Perfil } from './perfil/Perfil.entity';
import { Usuario } from './usuario/Usuario.entity';

//services
import { PerfilService } from './perfil/service/perfil.service';
import { UsuarioService } from './usuario/service/usuario.service';

//controllers
import { PerfilController } from './perfil/controller/perfil.controller';
import { UsuarioController } from './usuario/controller/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Perfil, Usuario])],
  controllers: [PerfilController, UsuarioController],
  providers: [PerfilService, UsuarioService],
  exports: [UsuarioService, TypeOrmModule],
})
export class DbModule {}
