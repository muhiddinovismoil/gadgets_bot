import { TypeOfAndroidPhone } from '../keyboard';

const brandExamples: Record<string, string> = {
  samsung: 'M32, A54, S24',
  redmi: 'Note 14 Pro, Turbo 4',
  mi: '15 Ultra, 15, 13 Lite',
  realme: 'C55, 11 Pro, Narzo 60x',
  infinix: 'Note 30, Zero 5G, Hot 40',
  poco: 'X5 Pro, F5, M6 Pro',
  tecno: 'Camon 20, Spark 10, Pova 5',
  oppo: 'A57, Reno 8, A77s',
};

export function AndroidDeviceModelAskMsg(brand: string) {
  const example = brandExamples[brand];
  const label = TypeOfAndroidPhone[brand];

  if (!example || !label) return null;

  return {
    uz: `📲 ${label.uz} brendiga tegishli telefon modelini kiriting. (Masalan: ${example})`,
    ru: `📲 Введите модель телефона бренда ${label.ru}. (Например: ${example})`,
    en: `📲 Enter the phone model of the ${label.en} brand. (e.g., ${example})`,
  };
}
