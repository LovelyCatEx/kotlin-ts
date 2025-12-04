import {RuntimeException} from "./RuntimeException";

export class IllegalStateException extends RuntimeException {
    constructor(public message: string) {
        super("IllegalStateException", message);
    }
}