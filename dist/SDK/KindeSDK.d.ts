import { AuthStatus } from './Enums/AuthStatus.enum';
declare class KindeSDK {
    issuer: string;
    redirectUri: string;
    clientId: string;
    logoutRedirectUri: string;
    scope: string;
    clientSecret?: string;
    authStatus: AuthStatus;
    /**
     * The constructor function takes in the issuer, redirectUri, clientId, logoutRedirectUri, and
     * scope as parameters
     * @param {string} issuer - The URL of the OIDC provider.
     * @param {string} redirectUri - The URL that the OIDC provider will redirect to after the user has
     * logged in.
     * @param {string} clientId - The client ID of your application.
     * @param {string} logoutRedirectUri - The URI to redirect to after logout.
     * @param {string} [scope=openid offline] - The scope of the access request.
     */
    constructor(issuer: string, redirectUri: string, clientId: string, logoutRedirectUri: string, scope?: string);
    /**
     * The function calls the login function of the AuthorizationCode class
     * @returns A promise that resolves to a void.
     */
    login(): Promise<void>;
    /**
     * It takes a URL as a parameter, parses it, and then sends a POST request to the token endpoint
     * with the code, client id, client secret, grant type, redirect URI, state, and code verifier
     * @param {string} url - The URL that the user is redirected to after they have logged in.
     * @returns A promise that resolves to the response from the token endpoint.
     */
    getToken(url: string): Promise<void>;
    /**
     * The function calls the login function of the AuthorizationCode class, passing in the current
     * instance of the class, a boolean value of true, and the string 'registration'
     * @returns A promise that resolves to void.
     */
    register(): Promise<void>;
    /**
     * It cleans up the local storage, and then opens a URL that will log the user out of the identity
     * provider
     */
    logout(): void;
    /**
     * It clears the session storage and sets the authentication status to unauthenticated
     * @returns The sessionStorage.clear() method is being returned.
     */
    cleanUp(): void;
    /**
     * It updates the authStatus variable and then saves the new value to the sessionStorage
     * @param {AuthStatus} _authStatus - The new auth status to set.
     */
    updateAuthStatus(_authStatus: AuthStatus): void;
    /**
     * If the authStatus is UNAUTHENTICATED, then return true
     * @returns A boolean value.
     */
    checkIsUnAuthenticated(): boolean;
    get authorizationEndpoint(): string;
    get tokenEndpoint(): string;
    get logoutEndpoint(): string;
}
export default KindeSDK;
