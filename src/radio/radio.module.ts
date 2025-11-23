import { Module } from '@nestjs/common';
import { RadioService } from './radio.service';
import { RadioController } from './radio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Radio } from './entities/radio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Radio])],
  controllers: [RadioController],
  providers: [RadioService],
})
export class RadioModule {}
