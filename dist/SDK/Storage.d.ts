import Store from './store';
declare class Storage extends Store {
    constructor();
    getAccessToken(): string | undefined;
    setAccessToken(newAccessToken: string): void;
    getState(): string | undefined;
    setState(newState: string): void;
    getCodeVerifier(): string | undefined;
    setCodeVerifier(newCodeVerifier: string): void;
    convertString(str: string | object): string;
}
declare const sessionStorage: Storage;
export { Storage, sessionStorage };