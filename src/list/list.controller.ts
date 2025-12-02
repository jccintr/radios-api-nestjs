import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body(ValidationPipe) createListDto: CreateListDto,
    @Request() req,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listService.create(createListDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async findAllByUser(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listService.findAllByUser(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.listService.findOne(+id, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateListDto: UpdateListDto,
    @Request() req,
  ) {
    return await this.listService.update(+id, updateListDto,req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req) {
    return await this.listService.remove(+id, req.user);
  }
}
