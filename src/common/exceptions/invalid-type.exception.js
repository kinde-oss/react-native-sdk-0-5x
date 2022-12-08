export class InvalidTypeException extends Error {
    constructor(result, expected) {
        super(`InvalidType ${result}. Expected: ${expected}`);
        this.name = 'InvalidTypeException';
    }
}
