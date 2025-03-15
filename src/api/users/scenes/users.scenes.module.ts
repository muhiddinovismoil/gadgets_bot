import { Module } from '@nestjs/common';
import { AskPhoneNumber, RegisterScene } from './register.scene';
@Module({
  imports: [],
  providers: [RegisterScene, AskPhoneNumber],
})
export class UserSceneModule {}
