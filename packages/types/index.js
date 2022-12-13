"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOYSTREAM_ADDRESS_PREFIX = exports.entriesByIds = exports.keysOf = exports.createType = exports.registry = void 0;
require("./augment/types-lookup");
require("./augment/registry");
require("./augment/augment-api");
const types_1 = require("@polkadot/types");
const lookup_1 = __importDefault(require("./augment/lookup"));
exports.registry = new types_1.TypeRegistry();
exports.registry.register(lookup_1.default);
function createType(typeName, value) {
    return exports.registry.createType(typeName, value);
}
exports.createType = createType;
function keysOf(typeName) {
    return exports.registry.createType(typeName).defKeys;
}
exports.keysOf = keysOf;
async function entriesByIds(apiMethod) {
    const entries = (await apiMethod.entries()).map(([storageKey, value]) => [
        storageKey.args[0],
        value,
    ]);
    return entries.sort((a, b) => a[0].toNumber() - b[0].toNumber());
}
exports.entriesByIds = entriesByIds;
exports.JOYSTREAM_ADDRESS_PREFIX = 126;
