import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private repository: Repository<City>,
  ) {}

  create(createCityDto: CreateCityDto) {
    const newCity = this.repository.create();
    newCity.name = createCityDto.name;
    newCity.uf = createCityDto.uf.toUpperCase();
    const citySaved = this.repository.save(newCity);
    return citySaved;
  }

  async findAll() {
    const cities = await this.repository.find();
    return cities;
  }

  async findOne(id: number) {
    const city = await this.repository.findOne({
      where: { id },
    });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.repository.findOne({
      where: { id },
    });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    if (updateCityDto.name) {
      city.name = updateCityDto.name;
    }
    if (updateCityDto.uf) {
      city.uf = updateCityDto.uf?.toUpperCase();
    }
    const updatedCity = await this.repository.save(city);
    return updatedCity;
  }

  async remove(id: number) {
    const city = await this.repository.findOne({
      where: { id },
    });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    await this.repository.remove(city);
  }
}
