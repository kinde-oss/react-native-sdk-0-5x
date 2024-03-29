/**
 * Kinde Management API
 * Provides endpoints to manage your Kinde Businesses
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: support@kinde.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import * as KeyChain from 'react-native-keychain';

/**
 * The Storage SDK module.
 * @module SDK/Storage
 * @version 1.1.0
 */

export default class KindeStorage {
    async getItem() {
        return KeyChain.getGenericPassword();
    }

    async setItem(value) {
        return KeyChain.setGenericPassword(
            'kinde',
            typeof value === 'string' ? value : JSON.stringify(value)
        );
    }

    clear() {
        return KeyChain.resetGenericPassword();
    }
}
