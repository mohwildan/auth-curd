import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  imageProfile: string;
  imagePost: string;
}

export class UpdatePostDto {
  @IsString()
  text: string;
}
