import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from '@/config';
import { BotService } from './bot.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()), UserModule],
  providers: [BotService],
})
export class BotModule {}
