import { Linking } from 'react-native';
import Url from 'url-parse';
import {
    generateChallenge,
    generateRandomString,
    addAdditionalParameters
} from '../Utils';
import Storage from '../Storage';

export default class AuthorizationCode {
    /**
     * It opens a browser window to the authorization endpoint of the Kindful API, passing along the
     * client ID, redirect URI, client secret, grant type, scope, start page, response type, state, and
     * any additional parameters that are passed in
     * @param kindSDK - The SDK object that you created in the previous step.
     * @param [usePKCE=false] - boolean, whether to use PKCE or not.
     * @param [startPage=login] - The page to start the login flow on.
     * @param [additionalParameters] - This is an object that contains additional parameters that you
     * want to pass to the login page.
     */
    login(
        kindSDK,
        usePKCE = false,
        startPage = 'login',
        additionalParameters = {}
    ) {
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
        addAdditionalParameters(URLParsed.query, additionalParameters);
        Storage.setState(stateGenerated);
        if (usePKCE) {
            const challenge = generateChallenge();
            URLParsed.query['code_challenge'] = challenge.codeChallenge;
            URLParsed.query['code_challenge_method'] = 'S256';
            Storage.setCodeVerifier(challenge.codeVerifier);
        }
        return Linking.openURL(URLParsed.toString());
    }
}
