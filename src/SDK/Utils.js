import crypto from 'crypto-js';

function base64URLEncode(str) {
    return str.toString(crypto.enc.Base64)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function sha256(buffer) {
    return crypto.SHA256(buffer).toString(crypto.enc.Base64)
}

function generateRandomString(byteLength = 32) {
    return base64URLEncode(crypto.lib.WordArray.random(byteLength));
}

function generateChallenge() {
    const state = generateRandomString();
    const codeVerifier = generateRandomString();
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    return {
        state,
        codeVerifier,
        codeChallenge
    }
}

function checkNotNull(reference) {
    if (reference === null || reference === undefined) {
        throw new Error('Reference cannot be empty');
    }
    return reference;
}
module.exports = {
    generateRandomString,
    generateChallenge,
    checkNotNull
}