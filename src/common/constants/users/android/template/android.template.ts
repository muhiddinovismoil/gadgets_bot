import { PhoneInfoI } from '@/common';

export function androidTemplate(data: PhoneInfoI) {
  const narxi = data.price.toString().length;
  return `📱 ${data.model}\n🛠 ${data.condition}\n🔋 ${data.batteryHealth}\n💵 ${narxi < 10000 ? data.price + `so'm` : data.price + `$`}\n🚚 ${data.delivery ? 'Bor' : "Yo'q"}\n📦/📃 ${data.document ? 'Bor' : "Yo'q"}\n📞 ${data.phone_number}\n ${data.exchange ? 'Bor' : "Yo'q"}`;
}
