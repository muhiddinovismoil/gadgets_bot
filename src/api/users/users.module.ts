import { Module } from '@nestjs/common';
import { UserSceneModule } from './scenes/users.scenes.module';
import { ActionsModule } from './actions/users.actions.module';
import { ActionsService } from './actions/users.actions.service';

@Module({
  imports: [UserSceneModule, ActionsModule],
  providers: [ActionsService],
})
export class UserModule {}
