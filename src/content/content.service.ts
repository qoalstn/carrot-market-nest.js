import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContnetRepository } from './content.repository';

@Injectable()
export class ContentService {
  constructor(private readonly contnetRepo: ContnetRepository) {}

  create(createContentDto: CreateContentDto) {
    console.log(createContentDto);

    this.contnetRepo.create();
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
