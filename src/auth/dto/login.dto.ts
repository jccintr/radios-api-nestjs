import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Field email is required' })
  @IsString({ message: 'Field email must be in string format' })
  @MinLength(5, { message: 'Field email must be at least 5 charaters long' })
  email: string;
  @IsNotEmpty({ message: 'Field email is required' })
  @IsString({ message: 'Field email must be in string format' })
  @MinLength(6, { message: 'Field email must be at least 6 charaters long' })
  password: string;
}
