import { Module } from '@nestjs/common';
import { ActionsService } from './users.actions.service';

@Module({
  imports: [],
  providers: [ActionsService],
})
export class ActionsModule {}
