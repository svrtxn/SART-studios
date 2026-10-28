import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FixedTransaction } from './fixed-transaction.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  SKIPPED = 'SKIPPED',
}

/**
 * Tracks individual payment instances for a recurring expense.
 * Separates "scheduled" from "realized" payments (Sección 12).
 */
@Entity()
export class RecurringPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FixedTransaction, { onDelete: 'CASCADE' })
  fixedTransaction: FixedTransaction;

  @Column()
  fixedTransactionId: number;

  /** e.g. "2026-08" for monthly */
  @Column()
  periodKey: string;

  @Column({
    type: 'varchar',
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  /** Actual amount paid (for variable-amount expenses) */
  @Column('integer', { nullable: true })
  paidAmount: number;

  @Column({ type: 'datetime', nullable: true })
  paidDate: Date;

  /** Link to the real transaction created when marked as paid */
  @ManyToOne(() => Transaction, { nullable: true, onDelete: 'SET NULL' })
  transaction: Transaction;

  @Column({ nullable: true })
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
