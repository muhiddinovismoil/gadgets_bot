import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export interface PhoneInfoI {
  price: number | 0;
  delivery: boolean;
  exchange: boolean;
  region: string;
  model: string;
  memory: string;
  batteryHealth: string;
  document: boolean;
  condition: string;
  images: string[];
  otherInfo: string;
  phone_number: string;
}
export const defaultPhoneInfo: PhoneInfoI = {
  price: 0,
  delivery: false,
  exchange: false,
  region: '',
  model: '',
  memory: '',
  batteryHealth: '',
  document: false,
  condition: '',
  images: [],
  otherInfo: '',
  phone_number: '',
};

export type ContextType = Context &
  SceneContext & {
    reply_to_message_id?: any;
    session: {
      isSceneChanging?: boolean;
      postId?: string;
      currentMediaGroupId?: string;
      tempGroupImages?: string[];
      groupTimeout?: NodeJS.Timeout;
      singleTimeout?: NodeJS.Timeout;
      hasEnteredNextScene?: boolean;
      isEditing?: boolean;
      lang: string;
      images: string[];
      lastMessage: any;
      lastConfirmationMessage: any;
      iphoneInfo: PhoneInfoI;
      androidInfo: PhoneInfoI;
      sendToAdmin?: boolean;
    };
  };
