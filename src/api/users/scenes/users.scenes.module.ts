import { Module } from '@nestjs/common';
import { AskPhoneNumber, RegisterScene } from './register.scene';
import { AndroidPostScene } from './android.scene';
import {
  AskiPhoneMemoryScene,
  AskiPhonePrice,
  AskPhoneNumberForPost,
  iPhonePostScene,
} from './iphone.scene';
import { PcPostScene } from './pc.scene';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    RegisterScene,
    AskPhoneNumber,
    AndroidPostScene,
    iPhonePostScene,
    AskiPhoneMemoryScene,
    PcPostScene,
    AskPhoneNumberForPost,
    AskiPhonePrice,
  ],
})
export class UserSceneModule {}
