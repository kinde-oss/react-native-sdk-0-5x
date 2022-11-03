import BaseStore from './base';

class Storage extends BaseStore {
    constructor() {
        super();
    }

    getAccessToken() {
        return this.getItem('accessToken');
    }

    setAccessToken(newAccessToken) {
        return this.setItem('accessToken', this.convertString(newAccessToken));
    }

    getState() {
        return this.getItem('state');
    }

    setState(newState) {
        return this.setItem('state', this.convertString(newState));
    }

    getCodeVerifier() {
        return this.getItem('codeVerifier');
    }

    setCodeVerifier(newCodeVerifier) {
        return this.setItem(
            'codeVerifier',
            this.convertString(newCodeVerifier)
        );
    }

    convertString(str) {
        return typeof str === 'string' ? str : JSON.stringify(str);
    }
}
const sessionStorage = (global.sessionStorage =
    global.sessionStorage ?? new Storage());

export default sessionStorage;
