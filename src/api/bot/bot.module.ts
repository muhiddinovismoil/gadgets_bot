import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from 'src/config';
import { BotService } from './bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity, UserEntity } from 'src/core';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AdminEntity]),
    TelegrafModule.forRootAsync(options()),
    UserModule,
  ],
  providers: [BotService],
})
export class BotModule {}
