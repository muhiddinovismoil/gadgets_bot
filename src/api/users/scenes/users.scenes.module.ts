import { Module } from '@nestjs/common';
import { AskPhoneNumber, RegisterScene } from './register.scene';
import { AndroidPostScene } from './android.scene';
import {
  iPhonePostScene,
  AskiPhoneMemoryScene,
  AskiPhonePrice,
  AskPhoneNumberForPost,
  AskiPhoneBattaryCondition,
  AskiPhoneDocumentsValid,
  AskiPhoneImages,
  AskiPhoneRegion,
  AskIsExchangeValid,
  AskisDeliveryValid,
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
    // Main Scenes
    RegisterScene,
    AskPhoneNumber,
    // ---------------------------------------------------------------------
    // Android Scenes
    AndroidPostScene,
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // iPhone Scenes
    iPhonePostScene,
    AskiPhonePrice,
    AskiPhoneMemoryScene,
    AskPhoneNumberForPost,
    AskiPhoneDocumentsValid,
    AskiPhoneBattaryCondition,
    AskiPhoneImages,
    AskiPhoneRegion,
    AskIsExchangeValid,
    AskisDeliveryValid,
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // Pc Scenes
    PcPostScene,
    AskTypePcScene,
    AskPricePcScene,
    AskStoreNamePc,
    AskProcessorPc,
    AskPhoneNumberPC,
    // ---------------------------------------------------------------------
  ],
})
export class UserSceneModule {}
