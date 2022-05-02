// Generate by
// npx mdl-gen-midway -h localhost -p 3306 -d yourdbname -u root -x yourpassword -e mysql --noConfig --case-property none

import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { Glass } from '../../model/Glasses'

@Index('id_UNIQUE', ['id'], { unique: true })
@EntityModel('glasses', { schema: 'inventory' })
export class Glasses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('bigint', { name: 'order_at' })
  orderAt: number;

  @Column('varchar', { name: 'name', length: 45 })
  name: string;

  @Column('varchar', { name: 'order_id', length: 45 })
  orderID: string;

  @Column('varchar', { name: 'phone', length: 45 })
  phone: string;

  @Column('float', {
    name: 'index_of_refraction',
    nullable: true,
    precision: 12,
  })
  indexOfRefraction: number | null;

  @Column('varchar', { name: 'brand', nullable: true, length: 45 })
  brand: string | null;

  @Column('varchar', { name: 'factor', nullable: true, length: 45 })
  factor: string | null;

  @Column('float', { name: 'axis', nullable: true, precision: 12 })
  axis: number | null;

  @Column('json', { name: 'glass', nullable: true })
  glass: Glass[] | null;

  @Column('varchar', { name: 'comment', nullable: true, length: 255 })
  comment: string | null;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date | null;

  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deleted_at: Date | null;
}
