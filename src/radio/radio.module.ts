import { Module } from '@nestjs/common';
import { RadioService } from './radio.service';
import { RadioController } from './radio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Radio } from './entities/radio.entity';
import { City } from 'src/city/entities/city.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Radio, City,Category])],
  controllers: [RadioController],
  providers: [RadioService],
})
export class RadioModule {}
