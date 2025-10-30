import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from '@/config';
import { PrismaModule } from '@/prisma';
import { GlobalUpdate } from '@/middleware';
import { BotService } from './bot.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, TelegrafModule.forRootAsync(options()), UserModule],
  providers: [BotService, GlobalUpdate],
})
export class BotModule {}
