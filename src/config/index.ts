import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export type ConfigType = {
  API_PORT: number;
  BOT_TOKEN: string;
  DB_URI: string;
  BOT_USERNAME: string;
};
const requiredVariables = [
  'API_PORT',
  'BOT_TOKEN',
  'NODE_ENV',
  'DATABASE_URL',
  'BOT_USERNAME',
];
const missingVariables = requiredVariables.filter((variable) => {
  const value = process.env[variable];
  return !value || value.trim() === '';
});
if (missingVariables.length > 0) {
  Logger.error(
    `Missing or empty required enviroment variables: ${missingVariables.join(',')}`,
  );
  process.exit(1);
}
export const config: ConfigType = {
  API_PORT: parseInt(process.env.API_PORT as string, 10),
  BOT_TOKEN: process.env.BOT_TOKEN as string,
  DB_URI: process.env.DATABASE_URL as string,
  BOT_USERNAME: process.env.BOT_USERNAME as string,
};
export * from './telegram.config';
