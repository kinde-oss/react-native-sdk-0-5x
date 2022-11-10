import { checkNotNull } from './Utils';
import Url from 'url-parse';
import { Linking } from 'react-native';
import AuthorizationCode from './OAuth/AuthorizationCode';
import { sessionStorage } from './Storage';

class KindeSDK {
    public issuer: string;
    public redirectUri: string;
    public clientId: string;
    public logoutRedirectUri: string;
    public scope: string;
    public clientSecret?: string;

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
    constructor(
        issuer: string,
        redirectUri: string,
        clientId: string,
        logoutRedirectUri: string,
        scope: string = 'openid offline'
    ) {
        this.issuer = issuer;
        checkNotNull(this.issuer, 'Issuer');

        this.redirectUri = redirectUri;
        checkNotNull(this.redirectUri, 'Redirect URI');

        this.clientId = clientId;
        checkNotNull(this.clientId, 'Client Id');

        this.logoutRedirectUri = logoutRedirectUri;
        checkNotNull(this.logoutRedirectUri, 'Logout Redirect URI');

        this.scope = scope;

        this.clientSecret = '';
    }

    /**
     * The function calls the login function of the AuthorizationCode class
     * @returns A promise that resolves to a void.
     */
    async login(): Promise<void> {
        this.cleanUp();
        const auth = new AuthorizationCode();
        return auth.login(this, true);
    }

    /**
     * It takes a URL as a parameter, parses it, and then sends a POST request to the token endpoint
     * with the code, client id, client secret, grant type, redirect URI, state, and code verifier
     * @param {string} url - The URL that the user is redirected to after they have logged in.
     * @returns A promise that resolves to the response from the token endpoint.
     */
    getToken(url: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                checkNotNull(url, 'URL');
                const URLParsed = Url(url, true);
                const { code, error, error_description } = URLParsed.query;
                checkNotNull(code, 'code');
                if (error) {
                    const msg = error_description ?? error;
                    reject(msg);
                }
                const formData = new FormData();
                formData.append('code', code);
                formData.append('client_id', this.clientId);
                formData.append('client_secret', this.clientSecret);
                formData.append('grant_type', 'authorization_code');
                formData.append('redirect_uri', this.redirectUri);
                const state = sessionStorage.getState();
                if (state) {
                    formData.append('state', state);
                }
                const codeVerifier = sessionStorage.getCodeVerifier();
                if (codeVerifier) {
                    formData.append('code_verifier', codeVerifier);
                }
                fetch(this.tokenEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                })
                    .then((response) => response.json())
                    .then(async (responseJson) => {
                        if (responseJson.error) {
                            reject(responseJson);
                        }
                        sessionStorage.setAccessToken(
                            responseJson.access_token
                        );
                        resolve(responseJson);
                    })
                    .catch((err) => {
                        reject(err.response.data);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * The function calls the login function of the AuthorizationCode class, passing in the current
     * instance of the class, a boolean value of true, and the string 'registration'
     * @returns A promise that resolves to void.
     */
    register(): Promise<void> {
        const auth = new AuthorizationCode();
        return auth.login(this, true, 'registration');
    }

    /**
     * It cleans up the local storage, and then opens a URL that will log the user out of the identity
     * provider
     */
    logout() {
        this.cleanUp();
        const URLParsed = Url(this.logoutEndpoint, true);
        URLParsed.query['redirect'] = this.logoutRedirectUri;
        Linking.openURL(URLParsed.toString());
    }

    cleanUp(): void {
        return sessionStorage.clear();
    }

    get authorizationEndpoint(): string {
        return `${this.issuer}/oauth2/auth`;
    }

    get tokenEndpoint(): string {
        return `${this.issuer}/oauth2/token`;
    }

    get logoutEndpoint(): string {
        return `${this.issuer}/logout`;
    }
}

export default KindeSDK;
