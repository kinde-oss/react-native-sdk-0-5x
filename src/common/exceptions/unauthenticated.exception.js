export class UnAuthenticatedException extends Error {
    constructor(msg) {
        super(msg ?? 'Request is missing required authentication credential');
        this.name = 'UnAuthenticatedException';
        this.property =
            msg ?? 'Request is missing required authentication credential';
    }
}
