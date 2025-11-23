import { Transform } from 'class-transformer';
import { Ufs } from '../entities/city.entity';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UnprocessableEntityException } from '@nestjs/common';

export class CreateCityDto {

  @IsNotEmpty({ message: 'Field name is required' })
  @IsString({ message: 'Field name must be in string format' })
  @MinLength(3, { message: 'Field name must be at least 3 charaters long' })
  name: string;

 @IsNotEmpty({ message: 'Field name is required' })
 @IsString({ message: 'Field name must be in string format' })
 @MinLength(2, { message: 'Field name must be at least 2 charaters long' })
 @MaxLength(2, { message: 'Field name must be at max 2 charaters long' })
 @Transform(({ value }) => {
    console.log(value);
    if (!value) return value;
    const upper = value.toString().toUpperCase().trim();
    console.log(upper);
    if (!(upper in Ufs)) {
      throw new UnprocessableEntityException(
        `Uf inválida: ${value}. Use uma sigla válida (SP, RJ, MG)`,
      );
    }
    return upper as string;
  })
  uf: string;
}
