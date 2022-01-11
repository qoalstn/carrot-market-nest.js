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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
    }),
    NoticeModule,
    HomeModule,
    LikeModule,
    UserModule,
    ChatModule,
    CommunityModule,
    MorganModule,
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
