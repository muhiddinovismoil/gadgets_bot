import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config';
import { Logger } from '@nestjs/common';

export class Application {
  static async main(): Promise<void> {
    const logger = new Logger();
    const app = await NestFactory.create(AppModule);
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const date = [
      `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`,
    ];
    logger.fatal(
      `BOT IS RUNNING ON: ${date} https://t.me/${config.BOT_USERNAME}`,
    );
    logger.fatal(`SERVER IS RUNNING ON PORT: ${date} ${config.API_PORT}`);

    app.listen(config.API_PORT || 3000);
  }
}
