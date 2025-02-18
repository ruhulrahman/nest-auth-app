import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Designation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  description: string;

  @Column()
  isActive: boolean;
  
  @Column({ default: false })
  isDeleted: boolean;
  
  @Column({ default: null })
  deletedAt: Date;
  
  @Column({ default: null })
  createdAt: Date;
  
  @Column({ default: null })
  updatedAt: Date;
  
  @Column({ default: null })
  deletedBy: number;
  
  @Column({ default: null })
  createdBy: number;
  
  @Column({ default: null })
  updatedBy: number;
  
  @Column({ default: null })
  deletedByUserId: number;
  
  @Column({ default: null })
  createdByUserId: number;
  
  @Column({ default: null })
  updatedByUserId: number;

  @Column({ default: null })
  departmentId: number;
}
