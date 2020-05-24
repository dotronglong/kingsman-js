"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const request_1 = __importDefault(require("./request"));
class Executor {
    constructor(request, transporter, replacer, emitter, parameters) {
        if (!transporter || !replacer || !emitter) {
            throw new Error("transporter, replacer and emitter must not be null");
        }
        this._request = request;
        this._transporter = transporter;
        this._replacer = replacer;
        this._emitter = emitter;
        this._parameters = parameters || {};
    }
    onSend(onSend) {
        this._onSend = onSend;
        return this;
    }
    onReceive(onReceive) {
        this._onReceive = onReceive;
        return this;
    }
    onError(onError) {
        this._onError = onError;
        return this;
    }
    send() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!this._request) {
                return reject(new Error("Request could not be found"));
            }
            try {
                if (this._onSend) {
                    this._onSend(this._request);
                }
                yield this._emitter.emit(constants_1.default.EVENT_SEND, this._request);
                let url = this._request.url;
                url = this._replacer.replace(url, this._parameters);
                const query = this._request.query.toString();
                if (query !== "") {
                    url = `${url}?${query}`;
                }
                this._request = new request_1.default(this._request.name, this._request.method, url, this._request.query, this._request.headers, this._request.attributes);
                try {
                    const response = yield this._transporter.transport(this._request);
                    yield this._emitter.emit(constants_1.default.EVENT_RECEIVE, this._request, response);
                    if (this._onReceive) {
                        this._onReceive(this._request, response);
                    }
                    resolve(response);
                }
                catch (e) {
                    yield this._emitter.emit(constants_1.default.EVENT_ERROR, this._request, e);
                    if (this._onError) {
                        this._onError(this._request, e);
                    }
                    reject(e);
                }
            }
            catch (e) {
                reject(e);
            }
        }));
    }
}
exports.default = Executor;
//# sourceMappingURL=executor.js.map