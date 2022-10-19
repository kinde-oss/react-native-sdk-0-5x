import { AsyncStorage } from "react-native";

export default class Storage {
    async getAccessToken() {
        return AsyncStorage.getItem('accessToken');
    }
    async setAccessToken(newAccessToken) {
        return AsyncStorage.setItem('accessToken', this.convertString(newAccessToken));
    }
    async getState() {
        return AsyncStorage.getItem('state');
    }
    async setState(newState) {
        return AsyncStorage.setItem('state', this.convertString(newState));
    }
    async getCodeVerifier() {
        return AsyncStorage.getItem('codeVerifier');
    }
    async setCodeVerifier(newCodeVerifier) {
        return AsyncStorage.setItem('codeVerifier', this.convertString(newCodeVerifier));
    }

    convertString(str) {
        return typeof str === 'string' ? str : JSON.stringify(str);
    }
}