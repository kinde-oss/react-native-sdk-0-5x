import Storage from '../Storage';
import KindeSDK from '../KindeSDK';
declare class AuthorizationCode extends Storage {
    constructor();
    login(kindSDK: KindeSDK, usePKCE?: boolean, startPage?: 'login' | 'registration'): Promise<void>;
}
export default AuthorizationCode;
