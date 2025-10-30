import { PhoneInfoI } from '@/common';

export function androidTemplate(data: PhoneInfoI) {
  const narxi = data.price.toString().length;
  return `📱 Model: ${data.model}\n🛠 Xolati: ${data.condition}\n🔋 Batareya xolati: ${data.batteryHealth}\n💵 Narxi: ${narxi < 10000 ? Intl.NumberFormat('en-US').format(data.price) + ` so'm` : Intl.NumberFormat('uz-UZ').format(data.price) + ` $`}\n🚚 Yetkazib berish: ${data.delivery ? 'Bor' : "Yo'q"}\n📦/📃 Kar/Dok: ${data.document ? 'Bor' : "Yo'q"}\n📞 Aloqa uchun: ${data.phone_number}\n♻️ Obmen: ${data.exchange ? 'Bor' : "Yo'q"}`;
}
