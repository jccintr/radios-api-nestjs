import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('items')
export class ListItemController {
  constructor(private readonly listItemService: ListItemService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createListItemDto: CreateListItemDto, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listItemService.create(createListItemDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listItemService.remove(+id);
  }
}
