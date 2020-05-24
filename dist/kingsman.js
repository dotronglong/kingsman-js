"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const constants_1 = __importDefault(require("./constants"));
const executor_1 = __importDefault(require("./executor"));
const registry_1 = __importDefault(require("./registry"));
const factory_1 = __importDefault(require("./replacer/factory"));
const axios_1 = __importDefault(require("./transporter/axios"));
class Kingsman {
    constructor(onInit, transporter, replacer) {
        this._transporter = transporter || new axios_1.default();
        this._replacer = replacer || new factory_1.default();
        this._emitter = new events_1.default();
        this._registry = new registry_1.default();
        if (onInit) {
            onInit(this._registry);
        }
    }
    onSend(onSend) {
        this._emitter.on(constants_1.default.EVENT_SEND, onSend);
        return this;
    }
    onReceive(onReceive) {
        this._emitter.on(constants_1.default.EVENT_RECEIVE, onReceive);
        return this;
    }
    onError(onError) {
        this._emitter.on(constants_1.default.EVENT_ERROR, onError);
        return this;
    }
    make(name, parameters) {
        return new executor_1.default(this._registry.make(name), this._transporter, this._replacer, this._emitter, Object.assign({}, this._registry.parameters, parameters));
    }
}
exports.default = Kingsman;
//# sourceMappingURL=kingsman.js.map