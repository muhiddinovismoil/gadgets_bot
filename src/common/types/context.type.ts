import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export type ContextType = Context &
  SceneContext & {
    reply_to_message_id?: any;
    session: {
      lang: string;
      lastMessage: any;
    };
  };
