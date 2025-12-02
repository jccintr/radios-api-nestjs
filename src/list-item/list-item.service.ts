import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListItem } from './entities/list-item.entity';
import { List } from 'src/list/entities/list.entity';
import { Radio } from 'src/radio/entities/radio.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private repository: Repository<ListItem>,
    @InjectRepository(List)
    private listRepository: Repository<List>,
    @InjectRepository(Radio)
    private radioRepository: Repository<Radio>,
  ) {}

  async create(createListItemDto: CreateListItemDto, user: User) {
    // verificar se a lista existe
    const list = await this.listRepository.findOne({
      where: { id: createListItemDto.listId },
      relations: ['user', 'listItems.radio'],
      select: {
        id: true,
        user: {
          id: true,
        },
      },
    });

    if (!list) {
      throw new NotFoundException(
        `List with ID ${createListItemDto.listId} not found`,
      );
    }
 
    // verificar se o auth é dono da lista
    if (user.id !== list.user.id) {
      throw new ForbiddenException(
        `User is not owner of List with ID ${createListItemDto.listId}`,
      );
    }
    // verificar se a radio existe
    const radio = await this.radioRepository.findOne({
      where: { id: createListItemDto.radioId },
    });
    if (!radio) {
      throw new NotFoundException(
        `Radio with ID ${createListItemDto.radioId} not found`,
      );
    }
    // verificar se a rádio já não está na lista
    for (const item of list.listItems) {
      if (item.radio.id === createListItemDto.radioId) {
        throw new UnprocessableEntityException(
          `Radio with ID ${createListItemDto.radioId} already is in the list`,
        );
      }
    }
    let newListItem = this.repository.create();
    newListItem.list = { id: createListItemDto.listId } as List;
    newListItem.radio = { id: createListItemDto.radioId } as Radio;
    newListItem = await this.repository.save(newListItem);
    return newListItem;
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }
}
