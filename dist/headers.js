"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Headers {
    constructor(data) {
        this._data = new Map();
        if (data) {
            for (let key of Object.keys(data)) {
                this.set(key, data[key]);
            }
        }
    }
    clear() {
        this._data.clear();
    }
    delete(key) {
        return this._data.delete(key);
    }
    forEach(callbackfn, thisArg) {
        for (let [key, value] of this._data.entries()) {
            callbackfn(value, key, this._data);
        }
    }
    has(key) {
        return this._data.has(key);
    }
    get size() {
        return this._data.size;
    }
    get [Symbol.toStringTag]() {
        return "Headers";
    }
    get data() {
        const data = {};
        for (let [key, value] of this._data.entries()) {
            data[key] = value;
        }
        return data;
    }
    set(key, value) {
        this._data.set(this._key(key), value);
        return this;
    }
    get(key) {
        return this._data.get(this._key(key)) || null;
    }
    _key(key) {
        const parts = key.split('-');
        for (let i = 0; i < parts.length; i++) {
            parts[i] = parts[i].toLowerCase();
            parts[i] = `${parts[i][0].toUpperCase()}${parts[i].substring(1, parts[i].length)}`;
        }
        return parts.join('-');
    }
    [Symbol.iterator]() {
        return this._data.entries();
    }
    entries() {
        return this._data.entries();
    }
    keys() {
        return this._data.keys();
    }
    values() {
        return this._data.values();
    }
}
exports.default = Headers;
//# sourceMappingURL=headers.js.map