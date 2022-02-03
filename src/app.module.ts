import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';
import { ChatModule } from './chat/chat.module';
import { CommunityModule } from './community/community.module';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { HomeModule } from './home/home.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { ContentModule } from './content/content.module';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { ContentEntity } from './content/entities/content.entity';

@Module({
  imports: [
    // .env를 불러오기 위해 사용
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [UserEntity, ContentEntity],
      logging: true,
      // synchronize: true, // entities 파일 -> mysql과 연동, production환경에서는 사용하지 않는 것을 권장.
    }),
    NoticeModule,
    HomeModule,
    LikeModule,
    UserModule,
    ChatModule,
    CommunityModule,
    MorganModule,
    AuthModule,
    LocationModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
