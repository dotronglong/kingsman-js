"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = __importDefault(require("../constants"));
const headers_1 = __importDefault(require("../headers"));
class AxiosTransporter {
    transport(request) {
        return new Promise((resolve, reject) => {
            axios_1.default({
                method: this.method(request),
                url: request.url,
                headers: request.headers.data,
                data: request.body || null
            }).then(response => resolve(this.response(response)))
                .catch(error => {
                if (error.response) {
                    resolve(this.response(error.response));
                }
                else if (error.request) {
                    reject(new Error("No responses found"));
                }
                else {
                    reject(new Error(error.message));
                }
            });
        });
    }
    method(request) {
        switch (request.method) {
            case constants_1.default.METHOD_GET:
                return 'get';
            case constants_1.default.METHOD_POST:
                return 'post';
            case constants_1.default.METHOD_PUT:
                return 'put';
            case constants_1.default.METHOD_PATCH:
                return 'patch';
            case constants_1.default.METHOD_DELETE:
                return 'delete';
            case constants_1.default.METHOD_HEAD:
                return 'head';
            case constants_1.default.METHOD_OPTIONS:
                return 'options';
            default:
                return 'get';
        }
    }
    response(response) {
        return new axiosResponse(response);
    }
}
exports.default = AxiosTransporter;
class axiosResponse {
    constructor(response) {
        this.statusCode = response.status;
        this.headers = new headers_1.default(response.headers);
        this.body = response.data;
    }
}
//# sourceMappingURL=axios.js.map