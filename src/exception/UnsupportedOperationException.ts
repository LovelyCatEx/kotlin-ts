import {RuntimeException} from "./RuntimeException";

export class UnsupportedOperationException extends RuntimeException {
    constructor(public message: string) {
        super("UnsupportedOperationException", message);
    }
}