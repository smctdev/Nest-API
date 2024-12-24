import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Validate,
  MinLength,
} from 'class-validator';
import { IsUnique } from '../../../common/pipes/unique.validator';
import { IsPasswordMatch } from '../../../common/pipes/confirm-password.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @Validate(IsUnique, ['users', 'email'], { message: 'Email is already taken' })
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @Validate(IsUnique, ['users', 'username'], {
    message: 'Username is already taken',
  })
  username?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsNotEmpty({ message: 'Password is required' })
  password?: string;

  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  role?: string;

  @IsString()
  @MinLength(6, {
    message: 'Confirmation Password must be at least 6 characters',
  })
  @IsPasswordMatch('password', { message: 'Passwords do not match' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;
}
