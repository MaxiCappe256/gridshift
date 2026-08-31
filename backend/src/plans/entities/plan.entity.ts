import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  code: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
