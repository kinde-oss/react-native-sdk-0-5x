import { Linking } from 'react-native';
import Url from 'url-parse';
import Storage from '../Storage';
import { generateChallenge, generateRandomString } from '../Utils';

export default class AuthorizationCode extends Storage {
    constructor() {
        super();
    }
    async login(kindSDK, usePKCE = false, startPage = 'login') {
        const URLParsed = Url(kindSDK.authorizationEndpoint, true);
        URLParsed.query['client_id'] = kindSDK.clientId;
        URLParsed.query['redirect_uri'] = kindSDK.redirectUri;
        URLParsed.query['client_secret'] = kindSDK.clientSecret;
        URLParsed.query['grant_type'] = 'authorization_code';
        URLParsed.query['scope'] = kindSDK.scope;
        URLParsed.query['start_page'] = startPage;
        URLParsed.query['response_type'] = 'code';

        const stateGenerated = generateRandomString();
        URLParsed.query['state'] = stateGenerated;
        await this.setState(stateGenerated);
        if (usePKCE) {
            const challenge = generateChallenge();
            URLParsed.query['code_challenge'] = challenge.codeChallenge;
            URLParsed.query['code_challenge_method'] = 'S256';
            await this.setCodeVerifier(challenge.codeVerifier);
        }
        Linking.openURL(URLParsed.toString());
    }
}
