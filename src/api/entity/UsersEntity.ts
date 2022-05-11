import { Column, Index, PrimaryGeneratedColumn } from 'typeorm'
import { EntityModel } from '@midwayjs/orm'

@Index('id_UNIQUE', ['id'], { unique: true })
@EntityModel('users', { schema: 'inventory' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'account', length: 45 })
  account: string

  @Column('varchar', { name: 'password', length: 45 })
  password: string

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
}
