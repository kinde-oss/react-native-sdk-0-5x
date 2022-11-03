import { Linking } from 'react-native';
import Url from 'url-parse';
import { generateChallenge, generateRandomString } from '../Utils';
import Storage from '../Storage';

export default class AuthorizationCode {
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
        Storage.setState(stateGenerated);
        if (usePKCE) {
            const challenge = generateChallenge();
            URLParsed.query['code_challenge'] = challenge.codeChallenge;
            URLParsed.query['code_challenge_method'] = 'S256';
            Storage.setCodeVerifier(challenge.codeVerifier);
        }
        Linking.openURL(URLParsed.toString());
    }
}
