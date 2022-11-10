export class PropertyRequiredException extends Error {
    constructor(msg) {
        super(`${msg} cannot be empty`);
        this.name = 'PropertyRequiredException';
        this.property = msg;
    }
}
