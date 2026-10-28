import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum NotificationType {
  LIMIT_WARNING = 'LIMIT_WARNING',
  LIMIT_REACHED = 'LIMIT_REACHED',
  LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',
  PAYMENT_UPCOMING = 'PAYMENT_UPCOMING',
  PAYMENT_DUE = 'PAYMENT_DUE',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
  GOAL_PROGRESS = 'GOAL_PROGRESS',
  GOAL_DEADLINE = 'GOAL_DEADLINE',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  type: NotificationType;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  /** JSON payload with contextual data (budgetId, fixedTransactionId, etc.) */
  @Column({ type: 'text', nullable: true })
  data: string;

  @CreateDateColumn()
  createdAt: Date;
}
