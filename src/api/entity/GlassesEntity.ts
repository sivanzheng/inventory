import { Column, Index, PrimaryGeneratedColumn } from 'typeorm'
import { EntityModel } from '@midwayjs/orm'
import { Eye } from '@src/api/models/Glasses'

@Index('id_UNIQUE', ['id'], { unique: true })
@EntityModel('glasses', { schema: 'inventory' })
export class Glasses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('bigint', { name: 'order_at' })
  orderAt: number

  @Column('varchar', { name: 'name', length: 45 })
  name: string

  @Column('varchar', { name: 'order_id', length: 45 })
  orderID: string

  @Column('varchar', { name: 'phone', length: 45 })
  phone: string

  @Column('varchar', { name: 'frame_brand', nullable: true, length: 45 })
  frameBrand: string | null

  @Column('varchar', { name: 'frame_model', nullable: true, length: 45 })
  frameModel: string | null

  @Column('float', { name: 'frame_price', nullable: true, precision: 12 })
  framePrice: number | null

  @Column('varchar', { name: 'frame_height', nullable: true, length: 45 })
  frameHeight: string | null

  @Column('varchar', { name: 'frame_size', nullable: true, length: 45 })
  frameSize: string | null

  @Column('varchar', { name: 'glass_brand', nullable: true, length: 45 })
  glassBrand: string | null

  @Column('varchar', { name: 'glass_model', nullable: true, length: 45 })
  glassModel: string | null

  @Column('float', { name: 'glass_price', nullable: true, precision: 12 })
  glassPrice: number | null

  @Column('float', {
    name: 'index_of_refraction',
    nullable: true,
    precision: 12,
  })
  indexOfRefraction: number | null

  @Column('json', { name: 'eyes', nullable: true })
  eyes: Eye[] | null

  @Column('float', { name: 'sum_pd', nullable: true, precision: 12 })
  sumPD: number | null

  @Column('float', { name: 'amount', nullable: true, precision: 12 })
  amount: number | null

  @Column('varchar', { name: 'comment', nullable: true, length: 255 })
  comment: string | null

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date | null

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date | null

  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deleted_at: Date | null
}
