import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma';
import { BotModule } from './bot/bot.module';
@Module({
  imports: [PrismaModule, BotModule],
})
export class AppModule {}
