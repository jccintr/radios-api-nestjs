import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('items')
export class ListItemController {
  constructor(private readonly listItemService: ListItemService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body(ValidationPipe) createListItemDto: CreateListItemDto,
    @Request() req,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listItemService.create(createListItemDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return this.listItemService.remove(+id, req.user);
  }
}
