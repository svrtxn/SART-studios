import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('integer')
  targetAmount: number; // In cents

  @Column('integer', { default: 0 })
  currentAmount: number; // In cents

  @Column({ type: 'date', nullable: true })
  targetDate: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  accountId: string; // Optional: Link goal to a specific account

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
