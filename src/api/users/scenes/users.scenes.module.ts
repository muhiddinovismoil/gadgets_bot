import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma';
import * as main from './register.scene';
import * as settings from './settings.scene';
import * as Android from './android.scene';
import * as iPhone from './iphone.scene';
import * as PC from './pc.scene';
@Module({
  imports: [PrismaModule],
  providers: [
    // Main Scenes
    main.RegisterScene,
    main.AskPhoneNumber,
    settings.EditLanguageScene,
    settings.EditPhoneNumber,

    // ---------------------------------------------------------------------
    // Android Scenes
    Android.AndroidPostScene,
    Android.InfinixScene,
    Android.MiScene,
    Android.OppoScene,
    Android.PocoScene,
    Android.RealmeScene,
    Android.RedmiScene,
    Android.SamsungScene,
    Android.TecnoScene,
    Android.AskAndroidMemoryScene,
    Android.AskisDeliveryValidForAndroid,
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // iPhone Scenes
    iPhone.iPhonePostScene,
    iPhone.AskiPhonePrice,
    iPhone.AskiPhoneMemoryScene,
    iPhone.AskiPhoneDocumentsValid,
    iPhone.AskiPhoneBattaryCondition,
    iPhone.AskiPhoneImages,
    iPhone.AskiPhoneRegion,
    iPhone.AskIsExchangeValid,
    iPhone.AskisDeliveryValidForIphone,
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // Pc Scenes
    PC.PcPostScene,
    // ---------------------------------------------------------------------
  ],
})
export class UserSceneModule {}
