import {RuntimeException} from "./RuntimeException";

export class ClassCastException extends RuntimeException {
    constructor(public message: string) {
        super("ClassCastException", message);
    }
}