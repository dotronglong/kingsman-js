"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const request_1 = __importDefault(require("./request"));
class Registry {
    constructor() {
        this._data = new Map();
        this.parameters = {};
    }
    add(name, method, url) {
        this._data.set(name, { method, url });
        return this;
    }
    remove(name) {
        this._data.delete(name);
        return this;
    }
    make(name) {
        if (!this._data.has(name)) {
            return null;
        }
        const item = this._data.get(name);
        return new request_1.default(name, item.method, item.url);
    }
    GET(name, url) {
        return this.add(name, constants_1.default.METHOD_GET, url);
    }
    POST(name, url) {
        return this.add(name, constants_1.default.METHOD_POST, url);
    }
    PUT(name, url) {
        return this.add(name, constants_1.default.METHOD_PUT, url);
    }
    PATCH(name, url) {
        return this.add(name, constants_1.default.METHOD_PATCH, url);
    }
    DELETE(name, url) {
        return this.add(name, constants_1.default.METHOD_DELETE, url);
    }
    OPTIONS(name, url) {
        return this.add(name, constants_1.default.METHOD_OPTIONS, url);
    }
    HEAD(name, url) {
        return this.add(name, constants_1.default.METHOD_HEAD, url);
    }
}
exports.default = Registry;
//# sourceMappingURL=registry.js.map