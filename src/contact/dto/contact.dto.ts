import type { Gender } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  userId: number;
}
