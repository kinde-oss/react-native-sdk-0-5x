import { checkNotNull } from './Utils';
import Url from 'url-parse';
import { Linking } from 'react-native';
import AuthorizationCode from './OAuth/AuthorizationCode';
import Storage from './Storage';
import authStatusConstants from './constants/auth-status.constants';
import { UnAuthenticatedException } from '../common/exceptions/unauthenticated.exception';

export default class KindeSDK {
    /**
     * The constructor function takes in the issuer, redirectUri, clientId, logoutRedirectUri, and
     * scope as parameters and assigns them to the class properties
     * @param issuer - The URL of the OpenID Connect provider.
     * @param redirectUri - The URL that the user will be redirected to after they log in.
     * @param clientId - The client ID of the application.
     * @param logoutRedirectUri - The URL to redirect to after logout.
     * @param [scope=openid offline] - The scope of the access request.
     */
    constructor(
        issuer,
        redirectUri,
        clientId,
        logoutRedirectUri,
        scope = 'openid offline'
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
        this.authStatus = authStatusConstants.UNAUTHENTICATED;
    }

    /**
     * The function calls the login() function of the AuthorizationCode class, which is a class that is
     * part of the Auth0 library
     * @returns A promise.
     */
    login() {
        this.cleanUp();
        const auth = new AuthorizationCode();
        this.updateAuthStatus(authStatusConstants.AUTHENTICATING);
        return auth.login(this, true);
    }

    /**
     * It takes a URL as an argument, parses the URL, and then uses the code from the URL to get an
     * access token from the token endpoint
     * @param url - The URL that the user is redirected to after they have logged in.
     * @returns A promise that resolves to an object containing the access token.
     */
    getToken(url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.checkIsUnAuthenticated()) {
                    reject(new UnAuthenticatedException());
                }
                checkNotNull(url, 'URL');
                const URLParsed = Url(url, true);
                const { code, error, error_description } = URLParsed.query;
                checkNotNull(code, 'code');
                if (error) {
                    const msg = error_description ? error_description : error;
                    reject(msg);
                }
                const formData = new FormData();
                formData.append('code', code);
                formData.append('client_id', this.clientId);
                formData.append('client_secret', this.clientSecret);
                formData.append('grant_type', 'authorization_code');
                formData.append('redirect_uri', this.redirectUri);
                const state = Storage.getState();
                if (state) {
                    formData.append('state', state);
                }
                const codeVerifier = Storage.getCodeVerifier();
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
                            return reject(responseJson);
                        }
                        Storage.setAccessToken(responseJson.access_token);
                        this.updateAuthStatus(
                            authStatusConstants.AUTHENTICATED
                        );
                        resolve(responseJson);
                    })
                    .catch((err) => {
                        this.updateAuthStatus(
                            authStatusConstants.UNAUTHENTICATED
                        );
                        reject(err.response.data);
                    });
            } catch (error) {
                this.updateAuthStatus(authStatusConstants.UNAUTHENTICATED);
                reject(error);
            }
        });
    }

    /**
     * The function calls the login() function of the AuthorizationCode class, which is a class that is
     * part of the Auth0 library
     * @returns A promise.
     */
    register() {
        const auth = new AuthorizationCode();
        this.updateAuthStatus(authStatusConstants.AUTHENTICATING);
        return auth.login(this, true, 'registration');
    }

    /**
     * It cleans up the local storage, then opens a new browser window to the logout endpoint, with a
     * redirect parameter set to the logout redirect uri
     */
    logout() {
        this.cleanUp();
        const URLParsed = Url(this.logoutEndpoint, true);
        URLParsed.query['redirect'] = this.logoutRedirectUri;
        Linking.openURL(URLParsed.toString());
    }

    cleanUp() {
        this.updateAuthStatus(authStatusConstants.UNAUTHENTICATED);
        return Storage.clear();
    }

    updateAuthStatus(_authStatus) {
        this.authStatus = _authStatus;
        Storage.setAuthStatus(this.authStatus);
    }

    checkIsUnAuthenticated() {
        const authStatusStorage = Storage.getAuthStatus();
        if (
            (!this.authStatus ||
                this.authStatus === authStatusConstants.UNAUTHENTICATED) &&
            (!authStatusStorage ||
                authStatusStorage === authStatusConstants.UNAUTHENTICATED)
        ) {
            return true;
        }
        return false;
    }

    get authorizationEndpoint() {
        return `${this.issuer}/oauth2/auth`;
    }

    get tokenEndpoint() {
        return `${this.issuer}/oauth2/token`;
    }

    get logoutEndpoint() {
        return `${this.issuer}/logout`;
    }
}
