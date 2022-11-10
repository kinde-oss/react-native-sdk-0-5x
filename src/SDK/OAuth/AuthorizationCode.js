import { Linking } from 'react-native';
import Url from 'url-parse';
import { generateChallenge, generateRandomString } from '../Utils';
import Storage from '../Storage';

export default class AuthorizationCode {
    /**
     * It generates a random string, stores it in the local storage, and then opens a browser window
     * with the URL to the authorization endpoint, passing the random string as a parameter
     * @param kindSDK - The object that contains the clientId, clientSecret, redirectUri,
     * authorizationEndpoint, and scope.
     * @param [usePKCE=false] - If you want to use PKCE, set this to true.
     * @param [startPage=login] - The page to start on. This can be either 'login' or 'register'.
     */
    login(kindSDK, usePKCE = false, startPage = 'login') {
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
