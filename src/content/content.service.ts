import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { contentRepository } from './content.repository';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepo: contentRepository) {}

  async create(createContentDto: CreateContentDto) {
    console.log('createContentDto', createContentDto);
    const { user_id, title, description } = createContentDto;
    const data = await this.contentRepo.insert({ user_id, title, description });
    console.log(data);

    if (data.identifiers.length !== 1) return { status: 500, msg: null };

    return { status: 201, data: data.identifiers[0] };
    // return 'This action adds a new content';
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
