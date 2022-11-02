import KindeSDK from '../KindeSDK';
declare class AuthorizationCode {
    login(kindSDK: KindeSDK, usePKCE?: boolean, startPage?: 'login' | 'registration'): Promise<void>;
}
export default AuthorizationCode;
