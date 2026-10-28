import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: { subcategories: true } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id }, relations: { subcategories: true } });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: Partial<Category>): Promise<Category> {
    const newCategory = this.categoriesRepository.create(data);
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, data: Partial<Category>): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, data);
    return this.categoriesRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoriesRepository.softRemove(category);
  }
}
