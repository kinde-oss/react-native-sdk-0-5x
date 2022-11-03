/* tslint:disable */
/* eslint-disable */
/**
 * Kinde Management API
 * Provides endpoints to manage your Kinde Businesses
 *
 * The version of the OpenAPI document: 0.2.1
 * Contact: support@kinde.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import { exists, mapValues } from '../ApiClient';
import type { User } from './User';
import { UserFromJSON, UserFromJSONTyped, UserToJSON } from './User';

/**
 *
 * @export
 * @interface Users
 */
export interface Users {
    /**
     *
     * @type {Array<User>}
     * @memberof Users
     */
    users?: Array<User>;
    /**
     *
     * @type {string}
     * @memberof Users
     */
    nextToken?: string;
}

/**
 * Check if a given object implements the Users interface.
 */
export function instanceOfUsers(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UsersFromJSON(json: any): Users {
    return UsersFromJSONTyped(json, false);
}

export function UsersFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): Users {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        users: !exists(json, 'users')
            ? undefined
            : (json['users'] as Array<any>).map(UserFromJSON),
        nextToken: !exists(json, 'next_token') ? undefined : json['next_token']
    };
}

export function UsersToJSON(value?: Users | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        users:
            value.users === undefined
                ? undefined
                : (value.users as Array<any>).map(UserToJSON),
        next_token: value.nextToken
    };
}
