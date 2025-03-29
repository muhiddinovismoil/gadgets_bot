import { Module } from '@nestjs/common';
import { UserEntity } from 'src/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AskPhoneNumber, RegisterScene } from './register.scene';
import { AndroidPostScene } from './android.scene';
import * as iPhone from './iphone.scene';
import * as PC from './pc.scene';
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
    iPhone.iPhonePostScene,
    iPhone.AskiPhonePrice,
    iPhone.AskiPhoneMemoryScene,
    iPhone.AskPhoneNumberForPost,
    iPhone.AskiPhoneDocumentsValid,
    iPhone.AskiPhoneBattaryCondition,
    iPhone.AskiPhoneImages,
    iPhone.AskiPhoneRegion,
    iPhone.AskIsExchangeValid,
    iPhone.AskisDeliveryValid,
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // Pc Scenes
    PC.PcPostScene,
    PC.AskTypePcScene,
    PC.AskPricePcScene,
    PC.AskStoreNamePc,
    PC.AskProcessorPc,
    PC.AskPhoneNumberPC,
    // ---------------------------------------------------------------------
  ],
})
export class UserSceneModule {}
