import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private repository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto, user: User) {
    let newList = this.repository.create();
    newList.name = createListDto.name;
    newList.user = user;
    newList = await this.repository.save(newList);
    return newList;
  }

  async findAll() {
    const lists = await this.repository.find({
      relations: ['user'],
      order: { name: 'ASC' },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          name: true,
          role: true,
        },
      },
    });
    return lists;
  }

  async findOne(id: number) {
    const list = await this.repository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          name: true,
          role: true,
        },
      },
    });
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
