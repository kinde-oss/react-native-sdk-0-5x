export class UnexpectedException extends Error {
    constructor(msg) {
        super(`Unexpected ${msg}`);
        this.name = 'UnexpectedException';
        this.property = msg;
    }
}
