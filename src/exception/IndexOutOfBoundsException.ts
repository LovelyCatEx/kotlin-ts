import {RuntimeException} from "./RuntimeException";

export class IndexOutOfBoundsException extends RuntimeException {
    constructor(public message: string) {
        super("IndexOutOfBoundsException", message);
    }
}