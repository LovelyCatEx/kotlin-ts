import {RuntimeException} from "./RuntimeException";

export class AccessDeniedException extends RuntimeException {
    constructor(public message: string) {
        super("AccessDeniedException", message);
    }
}