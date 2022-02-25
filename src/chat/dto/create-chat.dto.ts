import { IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  user_id: number;

  @IsString()
  user_type: string;

  @IsString()
  user_name: string;

  @IsString()
  product_id: string;

  @IsString()
  room_id?: string;

  @IsString()
  profile?: string;
}
