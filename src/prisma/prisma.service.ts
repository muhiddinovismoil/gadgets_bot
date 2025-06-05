import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { config } from 'src/config';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const databaseUrl = config.DB_URI;

    if (!databaseUrl) {
      throw new Error('Database URL not provided in config!');
    }

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: ['info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
