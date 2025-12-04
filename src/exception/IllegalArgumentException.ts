import {RuntimeException} from "./RuntimeException";

export class IllegalArgumentException extends RuntimeException {
    constructor(public message: string) {
        super("IllegalArgumentException", message);
    }
}