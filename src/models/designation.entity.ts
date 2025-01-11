import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Designation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
