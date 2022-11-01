export declare function generateRandomString(byteLength?: number): string;
export declare function generateChallenge(): {
    state: string;
    codeVerifier: string;
    codeChallenge: string;
};
export declare function checkNotNull<T>(reference: T | undefined | null, name: string): T | Error;
