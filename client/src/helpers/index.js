class LocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
    }

    get = (keyName, defaultValue) => {
        const value = this.localStorage.getItem(keyName);
        return value || defaultValue;
    }
    set = (keyName, value) => {
        console.log( value);
        this.localStorage.setItem(keyName, value);
    }
    delete = (keyName) => {
        this.localStorage.removeItem(keyName);
    }
}
const singleton = new LocalStorage();
export default singleton;