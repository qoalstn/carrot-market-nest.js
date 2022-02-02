import { IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsNumber()
  user_id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
