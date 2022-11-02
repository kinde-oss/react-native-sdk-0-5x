import Store from './store';
declare class Storage extends Store {
    constructor();
    getAccessToken(): Promise<string | null>;
    setAccessToken(newAccessToken: string): Promise<void>;
    getState(): Promise<string | null>;
    setState(newState: string): Promise<void>;
    getCodeVerifier(): Promise<string | null>;
    setCodeVerifier(newCodeVerifier: string): Promise<void>;
    convertString(str: string | object): string;
}
declare const sessionStorage: Storage;
export { Storage, sessionStorage };
