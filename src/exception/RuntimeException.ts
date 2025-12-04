export class RuntimeException extends Error {
    constructor(
        name: string | null,
        public message: string
    ) {
        super(message);
        this.name = name || 'RuntimeException';
    }
}