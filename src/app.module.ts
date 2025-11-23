import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { RadioModule } from './radio/radio.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { City } from './city/entities/city.entity';
import { Radio } from './radio/entities/radio.entity';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    CityModule,
    RadioModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'zodiac',
      database: 'radios-nestjs',
      entities: [Category, City, Radio],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
