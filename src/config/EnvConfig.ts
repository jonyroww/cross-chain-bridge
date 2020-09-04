import {Env} from "env-decorator";

export class EnvConfig {
    @Env({type: "number"})
    PORT: number = 3000;
}