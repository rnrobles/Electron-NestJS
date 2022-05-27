import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from '../usuario/Usuario.entity';

@Index('perfil_pk', ['perfilId'], { unique: true })
@Entity('perfil')
export class Perfil {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'perfil_id' })
  perfilId: number;

  @ApiProperty()
  @Column({
    name: 'ctrl_creado',
    default: () => 'CURRENT_TIMESTAMP',
  })
  ctrlCreado: Date;

  @ApiProperty()
  @Column('bigint', { name: 'ctrl_creado_por' })
  ctrlCreadoPor: number;

  @ApiProperty()
  @Column({
    name: 'ctrl_actualizado',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  ctrlActualizado: Date | null;

  @ApiProperty()
  @Column('bigint', { name: 'ctrl_actualizado_por', nullable: true })
  ctrlActualizadoPor: number | null;

  @ApiProperty()
  @Column('boolean', { name: 'ctrl_activo', default: () => 'true' })
  ctrlActivo: boolean;

  @ApiProperty()
  @Column('text', { name: 'nombre', unique: true })
  nombre: string;

  @ApiProperty()
  @Column('text', { name: 'descripcion' })
  descripcion: string;

  @ApiProperty({ type: () => Usuario })
  @OneToMany(() => Usuario, (usuario) => usuario.perfilIdPerfil)
  usuarios: Usuario[];
}
