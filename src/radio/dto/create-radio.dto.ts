import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

class CategoryDto {
  @IsInt({ message: 'O id da categoria deve ser um número inteiro' })
  id: number;
}

export class CreateRadioDto {
  @IsNotEmpty({ message: 'O nome curto é obrigatório' })
  @IsString({ message: 'O nome curto deve ser uma string' })
  name: string;
  @IsNotEmpty({ message: 'O nome curto é obrigatório' })
  @IsString({ message: 'O nome curto deve ser uma string' })
  shortName: string;
  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  @IsNotEmpty({ message: 'A URL da imagem é obrigatória' })
  streamUrl: string;
  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  @IsNotEmpty({ message: 'A URL da imagem é obrigatória' })
  imageUrl: string;
  @IsBoolean({ message: 'O campo hsl deve ser booleano' })
  hsl: boolean;
  @IsInt({ message: 'O cityId deve ser um número inteiro' })
  cityId: number;
  @IsArray({ message: 'As categorias devem ser um array' })
  @ArrayNotEmpty({ message: 'Pelo menos uma categoria deve ser informada' })
  categories: CategoryDto[];
}
