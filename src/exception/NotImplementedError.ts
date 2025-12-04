import {RuntimeException} from "./RuntimeException";

export class NotImplementedError extends RuntimeException {
    constructor(public message: string) {
        super("NotImplementedError", message);
    }
}