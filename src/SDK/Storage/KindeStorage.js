import * as KeyChain from 'react-native-keychain';

export default class KindeStorage {
    async getItem() {
        return KeyChain.getGenericPassword();
    }

    async setItem(value) {
        return KeyChain.setGenericPassword(
            'kinde',
            typeof value === 'string' ? value : JSON.stringify(value)
        );
    }

    clear() {
        return KeyChain.resetGenericPassword();
    }
}
