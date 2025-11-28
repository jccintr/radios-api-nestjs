import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Field name is required' })
  @IsString({ message: 'Field name must be in string format' })
  @MinLength(3, { message: 'Field name must be at least 3 charaters long' })
  name: string;
  @IsNotEmpty({ message: 'Field email is required' })
  @IsString({ message: 'Field email must be in string format' })
  @MinLength(5, { message: 'Field email must be at least 5 charaters long' })
  email: string;
  @IsNotEmpty({ message: 'Field password is required' })
  @IsString({ message: 'Field password must be in string format' })
  @MinLength(6, { message: 'Field password must be at least 6 charaters long' })
  password: string;
}
