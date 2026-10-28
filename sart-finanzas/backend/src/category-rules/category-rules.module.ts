import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRule } from './entities/category-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRule])],
  controllers: [],
  providers: [],
})
export class CategoryRulesModule {}
