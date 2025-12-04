import {RuntimeException} from "./RuntimeException";

export class NoSuchFileException extends RuntimeException {
    constructor(public message: string) {
        super("NoSuchFileException", message);
    }
}