import { checkNotNull } from './Utils';
import Url, { qs } from 'url-parse';
import { Linking } from 'react-native';
import Storage from './Storage';
import AuthorizationCode from './OAuth/AuthorizationCode';

export default class KindeSDK extends Storage {
    constructor(
        issuer,
        redirectUri,
        clientId,
        logoutRedirectUri,
        scope = 'openid offline'
    ) {
        super();
        this.issuer = issuer;
        checkNotNull(this.issuer, 'Issuer');

        this.redirectUri = redirectUri;
        checkNotNull(this.redirectUri, 'Redirect URI');

        this.clientId = clientId;
        checkNotNull(this.clientId, 'Client Id');

        this.logoutRedirectUri = logoutRedirectUri;
        checkNotNull(this.logoutRedirectUri, 'Logout Redirect URI');

        this.scope = scope;
    }

    async login() {
        await this.cleanUp();
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
                const formData = {
                    code,
                    client_id: this.clientId,
                    client_secret: null,
                    grant_type: 'authorization_code',
                    redirect_uri: this.redirectUri
                };
                const state = await this.getState();
                if (state) {
                    formData['state'] = state;
                }
                const codeVerifier = await this.getCodeVerifier();
                formData['code_verifier'] = codeVerifier;
                checkNotNull(code, 'Code Verifier');
                const that = this;
                fetch(this.tokenEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: qs.stringify(formData)
                })
                    .then((response) => response.json())
                    .then(async (responseJson) => {
                        if (responseJson.error) {
                            return reject(responseJson);
                        }
                        await that.setAccessToken(responseJson.access_token);
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

    logout() {
        this.cleanUp();
        const URLParsed = Url(this.logoutEndpoint, true);
        URLParsed.query['redirect'] = this.logoutRedirectUri;
        Linking.openURL(URLParsed.toString());
    }

    async cleanUp() {
        return Promise.all([
            this.setState(''),
            this.setAccessToken(''),
            this.setCodeVerifier('')
        ]);
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
