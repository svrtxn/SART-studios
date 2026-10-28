import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportBatch } from './entities/import-batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImportBatch])],
  controllers: [],
  providers: [],
})
export class ImportBatchesModule {}
