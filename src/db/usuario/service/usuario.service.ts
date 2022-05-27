import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilService } from 'src/db/perfil/service/perfil.service';
import { Equal, FindConditions, Repository } from 'typeorm';
import { UserRole, UsuarioFilter, UsuarioGet } from '../dto/usuario.dto';
import { Usuario } from '../Usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(forwardRef(() => PerfilService)) private perfilRepo: PerfilService,
    @InjectRepository(Usuario) private localRepo: Repository<Usuario>,
  ) {}

  findAll(params?: UsuarioFilter) {
    let where: FindConditions<Usuario> = {
      ctrlActivo: Equal(true),
    };

    if (params) {
      const { limit, offset, perfil } = params;

      if (perfil) {
        where = {
          ctrlActivo: Equal(true),
          perfilIdPerfil: { perfilId: UserRole[perfil] },
        };
      }

      return this.localRepo
        .find({
          relations: ['perfilIdPerfil'],
          where,
          take: limit,
          skip: offset,
        })
        .then((element) => {
          return this.mapUserDto(element);
        });
    }
    return this.localRepo
      .find({
        relations: ['perfilIdPerfil'],
        where,
      })
      .then((element) => {
        return this.mapUserDto(element);
      });
  }

  async find(Id: number) {
    const registro = await this.localRepo.findOne(Id, {
      relations: ['perfilIdPerfil'],
    });

    if (!registro) {
      throw new HttpException('Registro no encontrado', 400);
    }

    return this.mapUserDto([registro])[0];
  }

  async delete(Id: number) {
    const temp = await this.localRepo.findOne(Id);
    temp.ctrlActivo = false;
    const updateRegister = await this.localRepo.save(temp);
    return updateRegister;
  }

  mapUserDto(lista: Usuario[]): UsuarioGet[] {
    const temporal: UsuarioGet[] = [];
    lista.forEach((element) => {
      temporal.push({
        correo: element.correo,
        nombre: element.nombre,
        perfilId: this.perfilRepo.mapPerfilDto([element.perfilIdPerfil])[0],
        usuario: element.usuario,
        usuarioId: element.usuarioId,
      });
    });

    return temporal;
  }

  respuesta(promesa: Promise<any>) {
    promesa
      .then((element) => {
        console.log(element);
        if (element == undefined) {
          return new HttpException('Registro no encontrado', 400);
        } else {
          return element;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
