import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { RadioModule } from './radio/radio.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CategoryModule, CityModule, RadioModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
