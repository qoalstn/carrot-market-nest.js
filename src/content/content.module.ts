import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { contentRepository } from './content.repository';

@Module({
  imports: [TypeOrmModule.forFeature([contentRepository])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
