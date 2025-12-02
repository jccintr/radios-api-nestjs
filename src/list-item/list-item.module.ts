import { Module } from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { ListItemController } from './list-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListItem } from './entities/list-item.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Radio } from 'src/radio/entities/radio.entity';
import { List } from 'src/list/entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListItem, List, Radio]), AuthModule],
  controllers: [ListItemController],
  providers: [ListItemService],
})
export class ListItemModule {}
