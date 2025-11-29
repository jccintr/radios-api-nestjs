import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty({ message: 'Field name is required' })
  @IsString({ message: 'Field name must be in string format' })
  @MinLength(3, { message: 'Field name must be at least 3 charaters long' })
  name: string;
}
