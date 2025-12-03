import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRadioDto } from './dto/create-radio.dto';
import { UpdateRadioDto } from './dto/update-radio.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Radio } from './entities/radio.entity';
import { City } from 'src/city/entities/city.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class RadioService {
  constructor(
    @InjectRepository(Radio)
    private repository: Repository<Radio>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createRadioDto: CreateRadioDto) {
    const cityExists = await this.cityRepository.findOneBy({
      id: createRadioDto.cityId,
    });

    if (!cityExists) {
      throw new UnprocessableEntityException(
        `City ID ${createRadioDto.cityId} not found`,
      );
    }

    const newRadio = this.repository.create();
    newRadio.name = createRadioDto.name;
    newRadio.shortName = createRadioDto.shortName;
    newRadio.hsl = createRadioDto.hsl;
    newRadio.streamUrl = createRadioDto.streamUrl;
    newRadio.imageUrl = createRadioDto.imageUrl;
    newRadio.city = { id: createRadioDto.cityId } as City;
    newRadio.categories = []; // tem que inicializar o array
    // verifica se as categorias existem
    for (const category of createRadioDto.categories) {
      const categoryExists = await this.categoryRepository.findOneBy({
        id: category.id,
      });

      if (!categoryExists) {
        throw new UnprocessableEntityException(
          `Categoria com ID ${category.id} não encontrada`,
        );
      }
      if (!newRadio.categories.some((cat) => cat.id === category.id)) {
        newRadio.categories.push(categoryExists);
      }
    }
    const radioSaved = this.repository.save(newRadio);
    return radioSaved;
  }
 

  async findAll() {
    const radios = await this.repository.find({
      relations: ['city', 'categories'],
      select: {
        id: true,
        name: true,
        shortName: true,
        hsl: true,
        streamUrl: true,
        imageUrl: true,
        city: {
          name: true,
          uf: true,
        },
      },
      order: { name: 'ASC' },
    });
    return radios;
  }

  async findOne(id: number) {
    const radio = await this.repository.findOne({
      where: { id },
      relations: ['city', 'categories'],
      select: {
        id: true,
        name: true,
        shortName: true,
        hsl: true,
        streamUrl: true,
        imageUrl: true,
        city: {
          name: true,
          uf: true,
        },
      },
    });
    if (!radio) {
      throw new NotFoundException(`Radio with ID ${id} not found`);
    }
    return radio;
  }

  async update(id: number, updateRadioDto: UpdateRadioDto) {
    const radio = await this.repository.findOne({
      where: { id },
    });
    if (!radio) {
      throw new NotFoundException(`Radio with ID ${id} not found`);
    }
    // verifica se a cidade existe
    const cityExists = await this.cityRepository.findOneBy({
      id: updateRadioDto.cityId,
    });

    if (!cityExists) {
      throw new UnprocessableEntityException(
        `City ID ${updateRadioDto.cityId} not found`,
      );
    }
    radio.city = { id: updateRadioDto.cityId } as City;
    radio.categories = []; // limpa as categorias
    if (updateRadioDto.categories) {
      // verifica se as categorias existem
      for (const category of updateRadioDto.categories) {
        const categoryExists = await this.categoryRepository.findOneBy({
          id: category.id,
        });

        if (!categoryExists) {
          throw new UnprocessableEntityException(
            `Categoria com ID ${category.id} não encontrada`,
          );
        }
        if (!radio.categories.some((cat) => cat.id === category.id)) {
          radio.categories.push(categoryExists);
        }
      }
    }
    if (updateRadioDto.name) {
      radio.name = updateRadioDto.name;
    }
    if (updateRadioDto.shortName) {
      radio.shortName = updateRadioDto.shortName;
    }
    if (updateRadioDto.hsl) {
      radio.hsl = updateRadioDto.hsl;
    }
    if (updateRadioDto.imageUrl) {
      radio.imageUrl = updateRadioDto.imageUrl;
    }
    if (updateRadioDto.streamUrl) {
      radio.streamUrl = updateRadioDto.streamUrl;
    }
    const updatedRadio = await this.repository.save(radio);
    return updatedRadio;
  }

  async remove(id: number) {
    const radio = await this.repository.findOne({
      where: { id },
    });
    if (!radio) {
      throw new NotFoundException(`Radio with ID ${id} not found`);
    }
    await this.repository.remove(radio);
  }
}
