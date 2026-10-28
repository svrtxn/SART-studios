import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  date: Date; // Keep as Date for UTC handling

  @Column()
  description: string;

  @Column('integer')
  amount: number; // In cents. Negative for expenses, positive for incomes.

  @Column()
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER_IN' | 'TRANSFER_OUT';

  @ManyToOne(() => Account, account => account.transactions, { onDelete: 'CASCADE' })
  account: Account;

  @Column()
  accountId: string;

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  transferId: string; // Used to link TRANSFER_IN and TRANSFER_OUT

  @Column({ default: 'CLASSIFIED' })
  status: 'PENDING' | 'CLASSIFIED';

  @Column({ nullable: true })
  importBatchId: string; // If it came from a PDF

  @Column({ unique: true, nullable: true })
  hash: string; // To prevent duplicates

  @Column({ nullable: true })
  tag: string; // Custom label/tag for the transaction

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
