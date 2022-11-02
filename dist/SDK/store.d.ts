declare class Store {
    private data;
    constructor();
    getItem(key: string): any;
    get length(): number;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
    clear(): void;
}
export default Store;
