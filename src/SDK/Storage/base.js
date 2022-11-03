class BaseStore {
    constructor() {
        this.data = new Map();
    }

    getItem(key) {
        return this.data.get(key);
    }

    get length() {
        return this.data.size;
    }

    setItem(key, value) {
        this.data.set(key, value);
    }

    removeItem(key) {
        this.data.delete(key);
    }

    clear() {
        this.data = new Map();
    }
}
export default BaseStore;
