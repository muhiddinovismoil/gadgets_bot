import { PhonesI } from '@/common';

export function iphoneTemplate(data: PhonesI) {
  const narxi = data.price.toString().length;
  return `📱 ${data.model}\n🛠 ${data.condition}\n🔋 ${data.battery}\n💵 ${narxi > 4 ? data.price + `so'm` : data.price + `$`}\n🚚 ${data.delivery}\n📦/📃 ${data.document}\n📞 ${data.phone_number}\n ${data.exchange}`;
}
