import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsBoolean()
  isAdmin: boolean = false;
}


export class UpdateUserDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsBoolean()
  isAdmin: boolean = false;
}
