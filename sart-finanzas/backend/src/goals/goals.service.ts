import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
  ) {}

  findAll() {
    return this.goalsRepository.find();
  }

  create(goalData: Partial<Goal>) {
    const goal = this.goalsRepository.create(goalData);
    return this.goalsRepository.save(goal);
  }

  async update(id: string, goalData: Partial<Goal>) {
    await this.goalsRepository.update(id, goalData);
    return this.goalsRepository.findOne({ where: { id } as any });
  }

  async remove(id: string) {
    await this.goalsRepository.delete(id);
    return { success: true };
  }
}
