import { Module } from '@nestjs/common';
import { UserSceneModule } from './scenes/users.scenes.module';

@Module({
  imports: [UserSceneModule],
})
export class UserModule {}
