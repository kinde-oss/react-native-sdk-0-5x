const { KindeSDK, ApiClient, OAuthApi } = require(process.cwd() + '/src/index');
import { Linking } from 'react-native';
import Url from 'url-parse';
import BaseStore from './src/SDK/Storage/base';

BaseStore.prototype.getItem = jest.fn().mockReturnValue('random_value');
BaseStore.prototype.setItem = jest.fn();

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                access_token: 'this_is_access_token',
                scope: 'this_is_scope',
                state: 'this_is_state',
                token_type: 'this_is_token_type'
            })
    })
);

function FormDataMock() {
    this.append = jest.fn();
}

global.FormData = FormDataMock;
const configuration = {
    issuer: 'https://myhost.kinde.com',
    redirectUri: 'myapp://myhost.kinde.com/kinde_callback',
    clientId: 'spa@live',
    logoutRedirectUri: 'myapp://myhost.kinde.com/kinde_callback',
    scope: 'openid offline',
    authorizationEndpoint: 'https://myhost.kinde.com/oauth2/auth',
    tokenEndpoint: 'https://myhost.kinde.com/oauth2/token',
    logoutEndpoint: 'https://myhost.kinde.com/logout',
    fakeState: 'uUj8nEDL-jxeDbS_si86i7UsFmG5ewf0axDu96pdHGc',
    fakeCodeVerifier: 'K9E0HqVA4oxGuJqFWoasgmGKzI3Uxehdr9nTF2jaLR8',
    fakeCodeChallenge: '3Aqg8_tu8aNwnxPmhE1b1ONsThy-b6hppET0knva9Kc'
};

const fakeUserProfile = {
    id: 'kp:58ece9f68a7c4c098efc1cf45c774e16',
    last_name: 'test',
    first_name: 'user',
    provided_id: null,
    preferred_email: 'usertesting@yopmail.com'
};

const fakePayloadFromDecodeToken = {
    azp: 'spa@live',
    iss: 'https://trung.kinde.com',
    org_code: 'org_e5f28e1676d',
    org_codes: ['org_e5f28e1676d'],
    permissions: ['read:profile', 'read:email']
};

jest.mock('Linking', () => ({
    openURL: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
}));

jest.mock('./src/SDK/Utils', () => ({
    generateChallenge: jest.fn().mockReturnValue({
        state: 'uUj8nEDL-jxeDbS_si86i7UsFmG5ewf0axDu96pdHGc',
        codeVerifier: 'K9E0HqVA4oxGuJqFWoasgmGKzI3Uxehdr9nTF2jaLR8',
        codeChallenge: '3Aqg8_tu8aNwnxPmhE1b1ONsThy-b6hppET0knva9Kc'
    }),
    generateRandomString: jest
        .fn()
        .mockReturnValue('uUj8nEDL-jxeDbS_si86i7UsFmG5ewf0axDu96pdHGc'),
    checkNotNull: jest.fn((reference, name) => {
        if (reference === null || reference === undefined) {
            throw new Error(`${name} cannot be empty`);
        }
        return reference;
    }),
    checkAdditionalParameters: jest.fn(),
    addAdditionalParameters: jest.fn()
}));

jest.mock('jwt-decode', () =>
    jest.fn().mockReturnValue({
        azp: 'spa@live',
        iss: 'https://trung.kinde.com',
        org_code: 'org_e5f28e1676d',
        org_codes: ['org_e5f28e1676d'],
        permissions: ['read:profile', 'read:email']
    })
);

let globalClient;
describe('KindeSDK', () => {
    beforeAll(() => {
        globalClient = new KindeSDK(
            configuration.issuer,
            configuration.redirectUri,
            configuration.clientId,
            configuration.logoutRedirectUri
        );
    });
    beforeEach(() => {
        fetch.mockClear();
    });
    describe('Initial', () => {
        test('throws an error when issuer is not passed', () => {
            expect(() => {
                new KindeSDK();
            }).toThrow('Issuer cannot be empty');
        });
        test('throws an error when redirectUrl is not passed', () => {
            expect(() => {
                new KindeSDK(configuration.issuer);
            }).toThrow('Redirect URI cannot be empty');
        });
        test('throws an error when Client ID is not passed', () => {
            expect(() => {
                new KindeSDK(configuration.issuer, configuration.redirectUri);
            }).toThrow('Client Id cannot be empty');
        });
        test('throws an error when logoutRedirectUri is not passed', () => {
            expect(() => {
                new KindeSDK(
                    configuration.issuer,
                    configuration.redirectUri,
                    configuration.clientId
                );
            }).toThrow('Logout Redirect URI');
        });
        test('Matching authorizationEndpoint', () => {
            expect(globalClient.authorizationEndpoint).toBe(
                configuration.authorizationEndpoint
            );
        });
        test('Matching tokenEndpoint', () => {
            expect(globalClient.tokenEndpoint).toBe(
                configuration.tokenEndpoint
            );
        });
        test('Matching logoutEndpoint', () => {
            expect(globalClient.logoutEndpoint).toBe(
                configuration.logoutEndpoint
            );
        });
    });
    describe('Redirect', () => {
        test('Open authenticate endpoint', async () => {
            await globalClient.login();
            const URLParsed = Url(`${configuration.issuer}/oauth2/auth`, true);
            URLParsed.query['client_id'] = configuration.clientId;
            URLParsed.query['redirect_uri'] = configuration.redirectUri;
            URLParsed.query['client_secret'] = configuration.clientSecret;
            URLParsed.query['grant_type'] = 'authorization_code';
            URLParsed.query['scope'] = configuration.scope;
            URLParsed.query['start_page'] = 'login';
            URLParsed.query['response_type'] = 'code';
            URLParsed.query['state'] = configuration.fakeState;
            URLParsed.query['code_challenge'] = configuration.fakeCodeChallenge;
            URLParsed.query['code_challenge_method'] = 'S256';
            expect(Linking.openURL).toHaveBeenCalledWith(URLParsed.toString());
        });
        test('Open registration endpoint', async () => {
            await globalClient.register();
            const URLParsed = Url(configuration.authorizationEndpoint, true);
            URLParsed.query['client_id'] = configuration.clientId;
            URLParsed.query['redirect_uri'] = configuration.redirectUri;
            URLParsed.query['client_secret'] = configuration.clientSecret;
            URLParsed.query['grant_type'] = 'authorization_code';
            URLParsed.query['scope'] = configuration.scope;
            URLParsed.query['start_page'] = 'registration';
            URLParsed.query['response_type'] = 'code';
            URLParsed.query['state'] = configuration.fakeState;
            URLParsed.query['code_challenge'] = configuration.fakeCodeChallenge;
            URLParsed.query['code_challenge_method'] = 'S256';
            expect(Linking.openURL).toHaveBeenCalledWith(URLParsed.toString());
        });
        test('Logout', async () => {
            await globalClient.logout();
            const URLParsed = Url(configuration.logoutEndpoint, true);
            URLParsed.query['redirect'] = configuration.logoutRedirectUri;
            expect(Linking.openURL).toHaveBeenCalledWith(URLParsed.toString());
        });
    });
    describe('Token', () => {
        test('throws an error when url is not passed', async () => {
            await expect(globalClient.getToken()).rejects.toThrow(Error);
        });
        test('throws an error when missing code in query', async () => {
            await expect(
                globalClient.getToken(configuration.redirectUri)
            ).rejects.toThrow(Error);
        });
        test('throws an error when have error from callback', async () => {
            expect.assertions(1);
            try {
                await globalClient.getToken(
                    `${configuration.redirectUri}?code=random_code&error=invalid`
                );
            } catch (error) {
                expect(error).toMatch('invalid');
            }
        });
        test('Get Token instance', async () => {
            await globalClient.login();
            const token = await globalClient.getToken(
                `${configuration.redirectUri}?code=random_code`
            );
            expect(token).toEqual({
                access_token: 'this_is_access_token',
                scope: 'this_is_scope',
                state: 'this_is_state',
                token_type: 'this_is_token_type'
            });
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
    describe('Api', () => {
        test('Get user profile', async () => {
            const apiClient = new ApiClient(configuration.issuer);
            const apiInstance = new OAuthApi(apiClient);
            jest.spyOn(apiClient, 'callApi').mockImplementation(() => {
                return {
                    id: 'kp:58ece9f68a7c4c098efc1cf45c774e16',
                    last_name: 'test',
                    first_name: 'user',
                    provided_id: null,
                    preferred_email: 'usertesting@yopmail.com'
                };
            });
            await expect(apiInstance.getUserProfileV2()).toEqual(
                fakeUserProfile
            );
        });
    });
    describe('Payload', () => {
        test('Get claim via access token', () => {
            expect(globalClient.getClaim('iss')).toBe(
                fakePayloadFromDecodeToken.iss
            );
        });
        test('Get claim via id token', () => {
            expect(globalClient.getClaim('azp', 'id_token')).toBe(
                fakePayloadFromDecodeToken.azp
            );
        });
        test('Get permissions', () => {
            expect(globalClient.getPermissions()).toEqual({
                orgCode: fakePayloadFromDecodeToken.org_code,
                permissions: fakePayloadFromDecodeToken.permissions
            });
        });
        test('Get existed permission', () => {
            expect(globalClient.getPermission('read:profile')).toEqual({
                orgCode: fakePayloadFromDecodeToken.org_code,
                isGranted: true
            });
        });
        test('Get non-existed permission', () => {
            expect(globalClient.getPermission('write:profile')).toEqual({
                orgCode: fakePayloadFromDecodeToken.org_code,
                isGranted: false
            });
        });
        test('Get organization', () => {
            expect(globalClient.getOrganization()).toEqual({
                orgCode: fakePayloadFromDecodeToken.org_code
            });
        });
        test('Get organizations', () => {
            expect(globalClient.getUserOrganizations()).toEqual({
                orgCodes: fakePayloadFromDecodeToken.org_codes
            });
        });
    });
});
