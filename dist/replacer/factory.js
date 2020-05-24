"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FactoryReplacer {
    constructor(markerStart, markerStop) {
        this._markerStart = '{{';
        this._markerStop = '}}';
        if (markerStart !== undefined)
            this._markerStart = markerStart;
        if (markerStop !== undefined)
            this._markerStop = markerStop;
    }
    replace(text, parameters) {
        if (parameters === null) {
            return text;
        }
        let result = text;
        Object.keys(parameters).forEach(key => {
            result = result.replace(`${this._markerStart}${key}${this._markerStop}`, parameters[key]);
        });
        return result;
    }
}
exports.default = FactoryReplacer;
//# sourceMappingURL=factory.js.map