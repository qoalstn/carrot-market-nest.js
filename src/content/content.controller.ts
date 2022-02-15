import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createContentDto: CreateContentDto, @Req() req: any) {
    // console.log(11, createContentDto);
    // console.log(22, req.user);
    createContentDto.user_id = req.user.user_id;
    return this.contentService.create(createContentDto);
  }

  @Get('/:id')
  findAllByUser(@Param('id') id: number) {
    return this.contentService.findAllByUser(id);
  }

  // @Get()
  // findAll() {
  //   return this.contentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
  //   return this.contentService.update(+id, updateContentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contentService.remove(+id);
  // }
}
