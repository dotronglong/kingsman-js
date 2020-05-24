"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query extends Map {
    toString() {
        let query = "";
        for (let [key, value] of this) {
            if (query !== "") {
                query = `${query}&`;
            }
            query = `${query}${key}=${value}`;
        }
        return query;
    }
}
exports.default = Query;
//# sourceMappingURL=query.js.map