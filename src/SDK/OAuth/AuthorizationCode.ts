import { Linking } from 'react-native';
import Url from 'url-parse';
import { generateChallenge, generateRandomString } from '../Utils';
import KindeSDK from '../KindeSDK';
import { sessionStorage } from '../Storage';

class AuthorizationCode {
    /**
     * It generates a random string, stores it in the session storage, and then opens a browser window
     * with the KindeSDK authorization endpoint, passing the random string as a query parameter
     * @param {KindeSDK} kindSDK - KindeSDK - The SDK object that you created in the previous step.
     * @param {boolean} [usePKCE=false] - boolean = false
     * @param {'login' | 'registration'} [startPage=login] - 'login' | 'registration' = 'login'
     */
    async login(
        kindSDK: KindeSDK,
        usePKCE: boolean = false,
        startPage: 'login' | 'registration' = 'login'
    ): Promise<void> {
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
        sessionStorage.setState(stateGenerated);
        if (usePKCE) {
            const challenge = generateChallenge();
            URLParsed.query['code_challenge'] = challenge.codeChallenge;
            URLParsed.query['code_challenge_method'] = 'S256';
            sessionStorage.setCodeVerifier(challenge.codeVerifier);
        }
        Linking.openURL(URLParsed.toString());
    }
}

export default AuthorizationCode;
