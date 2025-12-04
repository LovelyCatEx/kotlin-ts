import {RuntimeException} from "./RuntimeException";

export class NullPointerException extends RuntimeException {
    constructor(public message: string) {
        super("NullPointerException", message);
    }
}