import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { PrismaModule } from 'src/prisma';
@Module({
  imports: [PrismaModule, BotModule],
})
export class AppModule {}
