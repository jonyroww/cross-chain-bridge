import { Env, loadConfig } from 'env-decorator';
import { config } from 'dotenv';
config();

export class EnvConfig {
  @Env({ type: 'number', required: true })
  PORT: number = 3000;

  @Env({ type: 'string', required: true })
  HOST: string;

  @Env({ type: 'string', required: true })
  IGNITE_TOKEN_EXCHANGE_API_BASE_URL: string;

  @Env({ type: 'string', required: true })
  BASE_URL: string;

  @Env({ type: 'string', required: true })
  DB_HOST: string;

  @Env({ type: 'number', required: true })
  DB_PORT: number;

  @Env({ type: 'string', required: true })
  DB_USERNAME: string;

  @Env({ type: 'string', required: true })
  DB_PASSWORD: string;

  @Env({ type: 'string', required: true })
  DB_NAME: string;
}

export const configEnv = loadConfig(EnvConfig);
