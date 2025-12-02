import {
  ConflictException,
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
        throw new ConflictException(
          `Radio with ID ${createListItemDto.radioId} already is in the list`,
        );
      }
    }
    // salva o novo list item
    let newListItem = this.repository.create();
    newListItem.list = { id: createListItemDto.listId } as List;
    newListItem.radio = { id: createListItemDto.radioId } as Radio;
    newListItem = await this.repository.save(newListItem);
    return newListItem;
  }

  async remove(id: number, user: User) {
    // verificar se o itemList existe
    const listItem = await this.repository.findOne({
      where: { id },
      relations: ['list'],
      select: {
        id: true,
        list: { id: true },
      },
    });
    if (!listItem) {
      throw new NotFoundException(`ListItem with ID ${id} not found`);
    }
    // recupera a lista para identificar o proprietario
    const list = await this.listRepository.findOne({
      where: { id: listItem.list.id },
      relations: ['user'],
      select: {
        id: true,
        user: {
          id: true,
        },
      },
    });
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    // verificar se o auth é dono da lista
    if (user.id !== list.user.id) {
      throw new ForbiddenException(
        `User is not owner of List with ID ${list.id}`,
      );
    }
    await this.repository.remove(listItem);
  }
}
