import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateListItemDto {
  @IsNotEmpty({ message: 'O nome curto é obrigatório' })
  @IsInt({ message: 'O listId deve ser um número inteiro' })
  listId: number;
  @IsNotEmpty({ message: 'O nome curto é obrigatório' })
  @IsInt({ message: 'O radioId deve ser um número inteiro' })
  radioId: number;
}
