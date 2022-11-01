declare class Storage {
    getAccessToken(): Promise<string | null>;
    setAccessToken(newAccessToken: string): Promise<void>;
    getState(): Promise<string | null>;
    setState(newState: string): Promise<void>;
    getCodeVerifier(): Promise<string | null>;
    setCodeVerifier(newCodeVerifier: string): Promise<void>;
    convertString(str: string | object): string;
}
export default Storage;
