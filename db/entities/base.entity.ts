import {
  PrimaryGeneratedColumn,
  BaseEntity as TBaseEntity,
  CreateDateColumn,
} from 'typeorm';

export class BaseEntity extends TBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  created_at!: Date;
}
