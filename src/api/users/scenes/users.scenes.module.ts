import { Module } from '@nestjs/common';
import { AskPhoneNumber, RegisterScene } from './register.scene';
import { AndroidPostScene } from './android.scene';
import { iPhonePostScene } from './iphone.scene';
import { PcPostScene } from './pc.scene';
@Module({
  imports: [],
  providers: [
    RegisterScene,
    AskPhoneNumber,
    AndroidPostScene,
    iPhonePostScene,
    PcPostScene,
  ],
})
export class UserSceneModule {}
