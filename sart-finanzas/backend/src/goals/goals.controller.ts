import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { Goal } from './entities/goal.entity';

@Controller('api/goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  findAll() {
    return this.goalsService.findAll();
  }

  @Post()
  create(@Body() goalData: Partial<Goal>) {
    return this.goalsService.create(goalData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() goalData: Partial<Goal>) {
    return this.goalsService.update(id, goalData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }
}
