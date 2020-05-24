"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = __importDefault(require("./headers"));
const query_1 = __importDefault(require("./query"));
class Request {
    constructor(name, method, url, query, headers, attributes) {
        this._name = name;
        this._url = url;
        this._method = method.toLowerCase();
        this._attributes = attributes || new Map();
        this._query = query || new query_1.default();
        this._headers = headers || new headers_1.default();
    }
    get name() {
        return this._name;
    }
    get url() {
        return this._url;
    }
    get method() {
        return this._method;
    }
    get attributes() {
        return this._attributes;
    }
    get query() {
        return this._query;
    }
    get headers() {
        return this._headers;
    }
}
exports.default = Request;
//# sourceMappingURL=request.js.map