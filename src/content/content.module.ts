import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContnetRepository } from './content.repository';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContnetRepository]),
    UserModule,
    AuthModule,
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
