import { AsyncStorage } from 'react-native';

class Storage {
    async getAccessToken(): Promise<string | null> {
        return AsyncStorage.getItem('accessToken');
    }

    async setAccessToken(newAccessToken: string): Promise<void> {
        return AsyncStorage.setItem(
            'accessToken',
            this.convertString(newAccessToken)
        );
    }

    async getState(): Promise<string | null> {
        return AsyncStorage.getItem('state');
    }

    async setState(newState: string): Promise<void> {
        return AsyncStorage.setItem('state', this.convertString(newState));
    }

    async getCodeVerifier(): Promise<string | null> {
        return AsyncStorage.getItem('codeVerifier');
    }

    async setCodeVerifier(newCodeVerifier: string): Promise<void> {
        return AsyncStorage.setItem(
            'codeVerifier',
            this.convertString(newCodeVerifier)
        );
    }

    convertString(str: string | object): string {
        return typeof str === 'string' ? str : JSON.stringify(str);
    }
}

export default Storage;
