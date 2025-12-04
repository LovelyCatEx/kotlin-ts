import {RuntimeException} from "./RuntimeException";

export class ArithmeticException extends RuntimeException {
    constructor(public message: string) {
        super("ArithmeticException", message);
    }
}