import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Perfil } from '../perfil/Perfil.entity';

@Index('usuario_unico', ['usuario'], { unique: true })
@Index('usuario_pk', ['usuarioId'], { unique: true })
@Entity('usuario')
export class Usuario {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'usuario_id' })
  usuarioId: number;

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
  @Column('text', { name: 'nombre' })
  nombre: string;

  @ApiProperty()
  @Column('text', { name: 'usuario', unique: true })
  usuario: string;

  @ApiProperty()
  @Column('text', { name: 'password' })
  password: string;

  @ApiProperty()
  @Column('text', { name: 'correo', nullable: true })
  correo: string | null;

  @ApiProperty({ type: () => Perfil })
  @ManyToOne(() => Perfil, (perfil) => perfil.usuarios, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'perfil_id_perfil', referencedColumnName: 'perfilId' }])
  perfilIdPerfil: Perfil;
}
