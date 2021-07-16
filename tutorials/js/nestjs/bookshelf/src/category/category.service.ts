import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryInput) {
    const categoryData = this.categoryRepository.create(data);
    const category = await this.categoryRepository.save(categoryData);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(name: string) {
    const category = await this.categoryRepository.findOne({ name });
    return category;
  }

  async update(data: UpdateCategoryInput) {
    const category = await this.categoryRepository.findOne({
      where: { id: data.id },
    });
    if (!category) throw new Error('Category not found!');
    Object.assign(category, data);
    await this.categoryRepository.save(category);
    return category;
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) throw new Error('Category not found!');
    await this.categoryRepository.remove(category);
    return category;
  }
}
