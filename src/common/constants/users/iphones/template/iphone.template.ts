import { PhoneInfoI } from '@/common';

export function iphoneTemplate(data: PhoneInfoI) {
  const narxi = data.price.toString().length;
  return `📱 Modeli: ${data.model}\n🛠 Xolati: ${data.condition}\n🔋Batareykasi xolati: ${data.batteryHealth}\n💵 Narxi: ${narxi > 4 ? data.price + `so'm` : data.price + `$`}\n🚚 Yetkazib berish: ${data.delivery}\n📦 Kar/Dok ${data.document}\n📞 Aloqa uchun: ${data.phone_number}\n ${data.exchange}`;
}
