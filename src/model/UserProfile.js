/**
 * Kinde Management API
 * Provides endpoints to manage your Kinde Businesses
 *
 * The version of the OpenAPI document: 0.1.1
 * Contact: support@kinde.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The UserProfile model module.
 * @module model/UserProfile
 * @version 0.1.1
 */
class UserProfile {
    /**
     * Constructs a new <code>UserProfile</code>.
     * @alias module:model/UserProfile
     */
    constructor() {
        UserProfile.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) {}

    /**
     * Constructs a <code>UserProfile</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserProfile} obj Optional instance to populate.
     * @return {module:model/UserProfile} The populated <code>UserProfile</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserProfile();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('preferred_email')) {
                obj['preferred_email'] = ApiClient.convertToType(
                    data['preferred_email'],
                    'String'
                );
            }
            if (data.hasOwnProperty('last_name')) {
                obj['last_name'] = ApiClient.convertToType(
                    data['last_name'],
                    'String'
                );
            }
            if (data.hasOwnProperty('first_name')) {
                obj['first_name'] = ApiClient.convertToType(
                    data['first_name'],
                    'String'
                );
            }
        }
        return obj;
    }
}

/**
 * @member {String} id
 */
UserProfile.prototype['id'] = undefined;

/**
 * @member {String} preferred_email
 */
UserProfile.prototype['preferred_email'] = undefined;

/**
 * @member {String} last_name
 */
UserProfile.prototype['last_name'] = undefined;

/**
 * @member {String} first_name
 */
UserProfile.prototype['first_name'] = undefined;

export default UserProfile;
