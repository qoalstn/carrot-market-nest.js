import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContnetRepository } from './content.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContnetRepository])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
