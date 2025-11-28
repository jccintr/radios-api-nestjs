import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Field email is required' })
  @IsString({ message: 'Field email must be in string format' })
  email: string;
  @IsNotEmpty({ message: 'Field password is required' })
  @IsString({ message: 'Field password must be in string format' })
  password: string;
}
