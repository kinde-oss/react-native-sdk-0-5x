import BaseStore from './Base';
declare class Storage extends BaseStore {
    constructor();
    getAccessToken(): string | undefined;
    setAccessToken(newAccessToken: string): void;
    getState(): string | undefined;
    setState(newState: string): void;
    getCodeVerifier(): string | undefined;
    setCodeVerifier(newCodeVerifier: string): void;
    getAuthStatus(): string | undefined;
    setAuthStatus(newAuthStatus: string): void;
    convertString(str: string | object): string;
}
declare const sessionStorage: Storage;
export { Storage, sessionStorage };
