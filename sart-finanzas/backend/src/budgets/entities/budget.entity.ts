import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Account } from '../../accounts/entities/account.entity';

export enum BudgetPeriod {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
  CUSTOM = 'CUSTOM',
}

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @Column('integer')
  amount: number; // Limit amount in CLP (no cents for CLP)

  @Column({ default: 'CLP' })
  currencyCode: string;

  @Column({
    type: 'varchar',
    default: BudgetPeriod.MONTHLY,
  })
  period: BudgetPeriod;

  @Column('integer', { default: 80 })
  warningThreshold: number; // Percentage for first alert

  @Column('integer', { default: 100 })
  limitThreshold: number; // Percentage for limit-reached alert

  // null = global (all accounts)
  @ManyToOne(() => Account, { nullable: true, onDelete: 'SET NULL' })
  account: Account;

  @Column({ nullable: true })
  accountId: string;

  @Column({ type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
