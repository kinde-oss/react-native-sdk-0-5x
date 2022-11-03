import { checkNotNull } from './Utils';
import Url from 'url-parse';
import { Linking } from 'react-native';
import AuthorizationCode from './OAuth/AuthorizationCode';
import Storage from './Storage';

export default class KindeSDK {
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
    }

    async login() {
        this.cleanUp();
        const auth = new AuthorizationCode();
        return auth.login(this, true);
    }

    getToken(url) {
        return new Promise(async (resolve, reject) => {
            try {
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

    register() {
        const auth = new AuthorizationCode();
        return auth.login(this, true, 'registration');
    }

    async logout() {
        this.cleanUp();
        const URLParsed = Url(this.logoutEndpoint, true);
        URLParsed.query['redirect'] = this.logoutRedirectUri;
        Linking.openURL(URLParsed.toString());
    }

    async cleanUp() {
        return Storage.clear();
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
