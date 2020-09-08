import {Env, loadConfig} from "env-decorator";
import { config } from 'dotenv';
config();

export class EnvConfig {
    @Env({type: "number", required: true})
    PORT: number = 3000;

    @Env({type: "string", required: true})
    HOST: string;

    @Env({type: "string", required: true})
    TRANSFER_TOKENS_API_URL: string;

    @Env({type: "string", required: true})
    HISTORY_TRANSACTIONS_API: string;

    @Env({type: "string", required: true})
    BASE_URL: string;
}

export const configEnv = loadConfig(EnvConfig);