import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthSignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 16, {
    message: 'passport minimum required is 4 and maxsimum is 16',
  })
  password: string;

  imageProfile: string;
}

export class AuthSigninDto {
  @IsEmail()
  email: string;

  @Length(4, 16, {
    message: 'passport minimum required is 4 and maxsimum is 16',
  })
  password: string;
}
