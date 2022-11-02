declare class KindeSDK {
    issuer: string;
    redirectUri: string;
    clientId: string;
    logoutRedirectUri: string;
    scope: string;
    clientSecret?: string;
    constructor(issuer: string, redirectUri: string, clientId: string, logoutRedirectUri: string, scope?: string);
    login(): Promise<void>;
    getToken(url: string): Promise<void>;
    register(): Promise<void>;
    logout(): Promise<void>;
    cleanUp(): Promise<void[]>;
    get authorizationEndpoint(): string;
    get tokenEndpoint(): string;
    get logoutEndpoint(): string;
}
export default KindeSDK;
