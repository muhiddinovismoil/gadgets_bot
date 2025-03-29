import { Module } from '@nestjs/common';
import { AskPhoneNumber, RegisterScene } from './register.scene';
import { AndroidPostScene } from './android.scene';
import {
  AskiPhoneMemoryScene,
  AskiPhonePrice,
  AskPhoneNumberForPost,
  iPhonePostScene,
} from './iphone.scene';
import {
  AskPhoneNumberPC,
  AskPricePcScene,
  AskProcessorPc,
  AskStoreNamePc,
  AskTypePcScene,
  PcPostScene,
} from './pc.scene';
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
    AskPhoneNumberForPost,
    AskiPhonePrice,
    PcPostScene,
    AskTypePcScene,
    AskPricePcScene,
    AskStoreNamePc,
    AskProcessorPc,
    AskPhoneNumberPC,
    PcPostScene,
    AskPhoneNumberForPost,
    AskiPhonePrice,
  ],
})
export class UserSceneModule {}
