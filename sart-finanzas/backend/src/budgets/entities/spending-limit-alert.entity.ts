import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Budget } from '../../budgets/entities/budget.entity';

/**
 * Records which alert thresholds have been triggered for a given budget
 * in a given period, preventing duplicate alerts (Sección 2, Regla 8).
 */
@Entity()
export class SpendingLimitAlert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Budget, { onDelete: 'CASCADE' })
  budget: Budget;

  @Column()
  budgetId: string;

  /** e.g. "2026-08" for monthly, "2026-W33" for weekly, "2026" for annual */
  @Column()
  periodKey: string;

  /** The threshold percentage that was reached (e.g. 80, 100, 110) */
  @Column('integer')
  thresholdReached: number;

  @CreateDateColumn()
  createdAt: Date;
}
