"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mappable {
    set(callback) {
        callback(this);
        return this;
    }
    mapFrom(keyPairs) {
        for (const key in keyPairs) {
            if (Object.prototype.hasOwnProperty.call(keyPairs, key)) {
                const v = keyPairs[key];
                this[key] = v;
            }
        }
        return this;
    }
}
exports.default = Mappable;
