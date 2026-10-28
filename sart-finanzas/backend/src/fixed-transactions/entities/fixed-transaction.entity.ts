import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Category } from '../../categories/entities/category.entity';

export enum Periodicity {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM',
}

@Entity()
export class FixedTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('integer')
  amount: number;

  @Column()
  type: 'INCOME' | 'EXPENSE';

  @Column({
    type: 'varchar',
    default: Periodicity.MONTHLY,
  })
  periodicity: Periodicity;

  @Column('integer', { nullable: true })
  paymentDay: number; // 1-31, used for monthly reminders

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  // Account from which this is paid
  @ManyToOne(() => Account, { nullable: true, onDelete: 'SET NULL' })
  account: Account;

  @Column({ nullable: true })
  accountId: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ default: false })
  isVariableAmount: boolean;

  /** JSON array of days before due date to remind, e.g. [7, 3, 1, 0] */
  @Column({ type: 'text', nullable: true })
  reminderDays: string; // stored as JSON string

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'CLP' })
  currencyCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
