import crypto, { LibWordArray } from 'crypto-js';

function base64URLEncode(str: string | LibWordArray): string {
    return str
        .toString()
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function sha256(buffer: string | LibWordArray): string {
    return crypto.SHA256(buffer).toString(crypto.enc.Base64);
}

export function generateRandomString(byteLength: number = 32): string {
    return base64URLEncode(crypto.lib.WordArray.random(byteLength));
}

export function generateChallenge(): {
    state: string;
    codeVerifier: string;
    codeChallenge: string;
} {
    const state = generateRandomString();
    const codeVerifier = generateRandomString();
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    return {
        state,
        codeVerifier,
        codeChallenge
    };
}

export function checkNotNull<T>(
    reference: T | undefined | null,
    name: string
): T | Error {
    if (reference === null || reference === undefined) {
        throw new Error(`${name} cannot be empty`);
    }
    return reference;
}
