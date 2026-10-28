import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entities
import { Transaction } from './transactions/entities/transaction.entity';
import { Category } from './categories/entities/category.entity';
import { CategoryRule } from './category-rules/entities/category-rule.entity';
import { Goal } from './goals/entities/goal.entity';
import { Benefit } from './benefits/entities/benefit.entity';
import { Bank } from './banks/entities/bank.entity';
import { FixedTransaction } from './fixed-transactions/entities/fixed-transaction.entity';
import { RecurringPayment } from './fixed-transactions/entities/recurring-payment.entity';
import { Account } from './accounts/entities/account.entity';
import { ImportBatch } from './import-batches/entities/import-batch.entity';
import { Budget } from './budgets/entities/budget.entity';
import { SpendingLimitAlert } from './budgets/entities/spending-limit-alert.entity';
import { Notification } from './notifications/entities/notification.entity';

// Modules
import { UploadModule } from './upload/upload.module';
import { BenefitsModule } from './benefits/benefits.module';
import { BanksModule } from './banks/banks.module';
import { GoalsModule } from './goals/goals.module';
import { TransactionsModule } from './transactions/transactions.module';
import { FixedTransactionsModule } from './fixed-transactions/fixed-transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoryRulesModule } from './category-rules/category-rules.module';
import { ImportBatchesModule } from './import-batches/import-batches.module';
import { BudgetsModule } from './budgets/budgets.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3' as any,
      database: 'database.sqlite',
      entities: [
        Transaction, Category, CategoryRule, Goal, Benefit, Bank, 
        FixedTransaction, RecurringPayment, Account, ImportBatch,
        Budget, SpendingLimitAlert, Notification
      ],
      synchronize: true, // Auto-create tables
    }),
    UploadModule,
    BenefitsModule,
    BanksModule,
    GoalsModule,
    TransactionsModule,
    FixedTransactionsModule,
    AccountsModule,
    CategoriesModule,
    CategoryRulesModule,
    ImportBatchesModule,
    BudgetsModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
