import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from 'src/config';
import { BotService } from './bot.service';
import { AdminEntity, PcEntity, PhoneEntity, UserEntity } from 'src/core';
import { UserModule } from '../users/users.module';
import { LaptopSceneModule } from '../laptop/laptop.scene.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AdminEntity, PhoneEntity, PcEntity]),
    TelegrafModule.forRootAsync(options()),
    UserModule,
  ],
  providers: [BotService],
})
export class BotModule {}
