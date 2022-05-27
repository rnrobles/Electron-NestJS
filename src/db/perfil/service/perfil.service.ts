import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/db/usuario/service/usuario.service';
import { FilterDto } from 'src/db/_dto/filter.dto';
import { Equal, FindConditions, Repository } from 'typeorm';
import { GetPerfilDto } from '../dto/perfil.dto';
import { Perfil } from '../Perfil.entity';

@Injectable()
export class PerfilService {
  constructor(
    @Inject(forwardRef(() => UsuarioService))
    private usuarioRepo: UsuarioService,
    @InjectRepository(Perfil) private localRepo: Repository<Perfil>,
  ) {}

  findAll(params?: FilterDto) {
    const where: FindConditions<Perfil> = {
      ctrlActivo: Equal(true),
    };

    if (params) {
      const { limit, offset } = params;
      return this.localRepo
        .find({
          relations: [],
          where,
          take: limit,
          skip: offset,
        })
        .then((resp) => {
          return this.mapPerfilDto(resp);
        });
    }
    return this.localRepo
      .find({
        relations: [],
        where,
      })
      .then((resp) => {
        return this.mapPerfilDto(resp);
      });
  }

  find(Id: number) {
    return this.localRepo.findOne({
      relations: [],
    });
  }

  async delete(Id: number) {
    const temp = await this.localRepo.findOne(Id);
    temp.ctrlActivo = false;
    const updateRegister = await this.localRepo.save(temp);
    return updateRegister;
  }

  mapPerfilDto(lista: Perfil[]): GetPerfilDto[] {
    const temporal: GetPerfilDto[] = [];
    lista.forEach((element) => {
      temporal.push({
        descripcion: element.descripcion,
        nombre: element.nombre,
        perfilId: element.perfilId,
      });
    });

    return temporal;
  }
}
