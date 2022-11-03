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

import * as runtime from '../ApiClient';
import type { UserProfile } from '../models';
import { UserProfileFromJSON, UserProfileToJSON } from '../models';

/**
 *
 */
export class UserApi extends runtime.BaseAPI {
    /**
     * Test
     * Returns current user profile
     */
    async getUserProfileRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<UserProfile>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters['Authorization'] =
                await this.configuration.accessToken('oauth', [
                    'offline',
                    'openid'
                ]);
        }

        const response = await this.request(
            {
                path: `/oauth2/user_profile`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response, (jsonValue) =>
            UserProfileFromJSON(jsonValue)
        );
    }

    /**
     * Test
     * Returns current user profile
     */
    async getUserProfile(
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<UserProfile> {
        const response = await this.getUserProfileRaw(initOverrides);
        return await response.value();
    }
}
