import {RuntimeException} from "./RuntimeException";

export class NoSuchElementException extends RuntimeException {
    constructor(public message: string) {
        super("NoSuchElementException", message);
    }
}