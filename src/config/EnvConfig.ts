import {Env} from "env-decorator";

export class EnvConfig {
    @Env({type: "number", required: true})
    PORT: number = 3000;

    @Env({type: "string", required: true})
    TRANSFER_TOKENS_API_URL: string;
}