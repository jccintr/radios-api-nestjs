import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';
import { Role, User } from 'src/user/entities/user.entity';
import { ListResponseDto, UserResponseDto } from './dto/list-response.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private repository: Repository<List>,
    @InjectRepository(ListItem)
    private listItemRepository: Repository<ListItem>,
  ) {}

  async create(
    createListDto: CreateListDto,
    user: User,
  ): Promise<ListResponseDto> {
    let newList = this.repository.create();
    newList.name = createListDto.name;
    newList.user = user;
    newList = await this.repository.save(newList);
    const userDto: UserResponseDto = new UserResponseDto(user.id, user.name);
    const listResponseDTO: ListResponseDto = new ListResponseDto(
      newList.id,
      newList.name,
      userDto,
      newList.createdAt,
      newList.updatedAt,
    );
    return listResponseDTO;
  }

  async findAll(user: User) {
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException();
    }
    return await this.repository.find({
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
        },
      },
    });
  }

  async findAllByUser(user: User) {
    return this.repository.find({
      where: { user: { id: user.id } },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number, user: User) {
    // somente podem acessar admin ou owner
    const list = await this.repository.findOne({
      where: { id },
      relations: ['user', 'listItems.radio'],
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

    if (user.id !== list.user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        `User is not owner of List with ID ${id} or has Admin Role`,
      );
    }
    return list;
  }

  async update(id: number, updateListDto: UpdateListDto, user: User) {
    let list = await this.repository.findOne({
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
        },
      },
    });
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    if (user.id !== list.user.id) {
      throw new ForbiddenException(`User is not owner of List with ID ${id}`);
    }
    if (updateListDto.name) {
      list.name = updateListDto.name;
    }
    list = await this.repository.save(list);
    return list;
  }

  async remove(id: number, user: User) {
    const list = await this.repository.findOne({
      where: { id },
      relations: ['user', 'listItems'],
      select: {
        id: true,
        user: {
          id: true,
          role: true,
        },
      },
    });
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    if (user.id !== list.user.id) {
      throw new ForbiddenException(`User is not owner of List with ID ${id}`);
    }
    if (user.id !== list.user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        `User is not owner of List with ID ${id} or has Admin Role`,
      );
    }
    //primeiro remove os items da lista
    const itemsToRemove: ListItem[] = [];

    for (const item of list.listItems) {
      const itemToRemove = await this.listItemRepository.findOne({
        where: { id: item.id },
      });

      if (itemToRemove) {
        itemsToRemove.push(itemToRemove);
      }
    }

    if (itemsToRemove.length > 0) {
      await this.listItemRepository.remove(itemsToRemove);
    }
    await this.repository.remove(list);
  }
}
