import {RuntimeException} from "./RuntimeException";

export class NumberFormatException extends RuntimeException {
    constructor(public message: string) {
        super("NumberFormatException", message);
    }
}