import crypto from 'crypto-js';
import { PropertyRequiredException } from '../common/exceptions/property-required.exception';

/**
 * It takes a string, converts it to Base64, replaces the + and / characters with - and _ respectively,
 * and removes the = character
 * @param str - The string to encode.
 * @returns A string that is the base64 encoding of the input string.
 */
function base64URLEncode(str) {
    return str
        .toString(crypto.enc.Base64)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * It takes a string and returns a string
 * @param buffer - The buffer to hash.
 * @returns The SHA256 hash of the buffer.
 */
function sha256(buffer) {
    return crypto.SHA256(buffer).toString(crypto.enc.Base64);
}

/**
 * It generates a random string of a given length
 * @param [byteLength=32] - The length of the random string in bytes. The default is 32 bytes.
 * @returns A random string of 32 bytes.
 */
function generateRandomString(byteLength = 32) {
    return base64URLEncode(crypto.lib.WordArray.random(byteLength));
}

/**
 * It generates a random string, hashes it, and then encodes it in a way that's safe to use in a URL
 * @returns An object with three properties: state, codeVerifier, and codeChallenge.
 */
function generateChallenge() {
    const state = generateRandomString();
    const codeVerifier = generateRandomString();
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    return {
        state,
        codeVerifier,
        codeChallenge
    };
}

/**
 * "If the reference is null or undefined, throw a PropertyRequiredException, otherwise return the
 * reference."
 *
 * The function is a bit more complicated than that, but that's the gist of it
 * @param reference - The reference to check.
 * @param name - The name of the property that is required.
 * @returns The reference itself.
 */
function checkNotNull(reference, name) {
    if (reference === null || reference === undefined) {
        throw new PropertyRequiredException(name);
    }
    return reference;
}
module.exports = {
    generateRandomString,
    generateChallenge,
    checkNotNull
};
