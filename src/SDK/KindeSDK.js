import { checkNotNull } from './Utils';
import GrantType from './GrantType';
import URL from 'url';
import { Linking } from 'react-native';
import Storage from './Storage';
import AuthorizationCode from './OAuth/AuthorizationCode';

export default class KindeSDK extends Storage {
    constructor(issuer, redirectUrl, grantType, clientId, clientSecret, scope = 'openid offline') {
        super();
        this.issuer = issuer;
        checkNotNull(this.issuer);

        this.clientId = clientId;
        checkNotNull(this.clientId);

        this.redirectUrl = redirectUrl;
        checkNotNull(this.redirectUrl);

        this.grantType = grantType;
        checkNotNull(this.grantType);

        this.clientSecret = clientSecret;

        if (GrantType.PKCE !== this.grantType) {
            checkNotNull(this.grantType);
        }

        this.scope = scope;
    }

    async login() {
        this.cleanUp();
        const auth = new AuthorizationCode();
        const usePKCE = GrantType.PKCE === this.grantType;
        return auth.login(this, usePKCE);
    }

    getToken(url) {
        return new Promise(async (resolve, reject) => {
            const URLParsed = URL.parse(url, true);
            const { code } = URLParsed.query
            const formData = new FormData();
            formData.append('code', code);
            formData.append('client_id', this.clientId);
            formData.append('client_secret', this.clientSecret);
            formData.append('grant_type', 'authorization_code');
            formData.append('redirect_uri', this.redirectUrl);
            const state = await this.getState();
            if (state) {
                formData.append('state', state);
            }
            const codeVerifier = await this.getCodeVerifier();
            if (codeVerifier) {
                formData.append('code_verifier', codeVerifier);
            }
            const that = this;
            fetch(this.tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            }).then((response) => response.json()).then(async (responseJson) => {
                if (responseJson.error) {
                    return reject(responseJson);
                }
                await that.setAccessToken(responseJson.access_token);
                resolve(responseJson);
            }).catch((err) => {
                reject(err.response.data);
            })
        })
    }

    register() {
        const auth = new AuthorizationCode();
        return auth.login(this, GrantType.PKCE === this.grantType, 'registration');
    }

    logout() {
        this.cleanUp();
        Linking.openURL(this.logoutEndpoint);
    }

    async cleanUp() {
        await Promise.all(this.setState(null), this.setAccessToken(null), this.setCodeVerifier(null));
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