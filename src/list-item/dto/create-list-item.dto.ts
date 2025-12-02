import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateListItemDto {
  @IsNotEmpty({ message: 'Field listId is required' })
  @IsInt({ message: 'Field listId must be a integer' })
  listId: number;
  @IsNotEmpty({ message: 'Field radioId is required' })
  @IsInt({ message: 'Field radioId must be a integer' })
  radioId: number;
}
