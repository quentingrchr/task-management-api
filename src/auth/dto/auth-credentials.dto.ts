import {
  IsEmail,
  isString,
  Matches,
  MaxLength,
  MinLength,
  IsString,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)

  /* Password will contain at least 1 uppercase letter, 
  1 lowercase letter, 
  1 number or 1 special character */
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message:
      'Password is too weak (must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or 1 special character)',
  })
  password: string;
}
