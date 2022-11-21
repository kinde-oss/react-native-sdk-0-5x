import KindeSDK from '../KindeSDK';
declare class AuthorizationCode {
    /**
     * It generates a random string, stores it in the session storage, and then opens a browser window
     * with the KindeSDK authorization endpoint, passing the random string as a query parameter
     * @param {KindeSDK} kindSDK - KindeSDK - The SDK object that you created in the previous step.
     * @param {boolean} [usePKCE=false] - boolean = false
     * @param {'login' | 'registration'} [startPage=login] - 'login' | 'registration' = 'login'
     */
    login(kindSDK: KindeSDK, usePKCE?: boolean, startPage?: 'login' | 'registration'): Promise<void>;
}
export default AuthorizationCode;
