import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.repository.create();
    newCategory.name = createCategoryDto.name;
    const categorySaved = this.repository.save(newCategory);
    return categorySaved;
  }

  async findAll() {
    const categories = await this.repository.find();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.repository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }
    const updatedCategory = await this.repository.save(category);
    return updatedCategory;
  }

  async remove(id: number) {
    const category = await this.repository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.repository.remove(category);
  }
}
