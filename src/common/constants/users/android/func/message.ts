import { TypeOfAndroidPhone } from '../keyboard';

export function AndroidDeviceModelAskMsg(brand: string) {
  return {
    uz: `📲 ${TypeOfAndroidPhone[brand].uz} brendiga tegishli telefon modelini kiriting. (Masalan: Note 10 Pro, A54, S24...)`,
    ru: `📲 Введите модель телефона бренда ${TypeOfAndroidPhone[brand].ru}. (Например: Note 10 Pro, A54, S24...)`,
    en: `📲 Enter the phone model of the ${TypeOfAndroidPhone[brand].en} brand. (e.g., Note 10 Pro, A54, S24...)`,
  };
}
