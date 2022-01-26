import { IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsNumber()
  user_id: string;

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
