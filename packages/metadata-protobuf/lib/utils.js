"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSubdivisionCode = exports.isValidLanguageCode = exports.isValidCountryCode = exports.metaToObject = exports.encodeDecode = exports.integrateMeta = exports.isEmptyObject = exports.isSet = void 0;
const i18n_iso_countries_1 = __importDefault(require("i18n-iso-countries"));
const iso_639_1_1 = __importDefault(require("iso-639-1"));
const iso_3166_2_1 = __importDefault(require("iso-3166-2"));
function isSet(v) {
    return v !== null && v !== undefined;
}
exports.isSet = isSet;
function isEmptyObject(object) {
    return Object.keys(object).length === 0;
}
exports.isEmptyObject = isEmptyObject;
function integrateMeta(object, meta, props) {
    props.forEach((prop) => {
        const metaPropVal = meta[prop];
        if (isSet(metaPropVal)) {
            object[prop] = metaPropVal;
        }
    });
}
exports.integrateMeta = integrateMeta;
function encodeDecode(metaClass, value) {
    const encoded = metaClass.encode(value).finish();
    return metaToObject(metaClass, metaClass.decode(encoded));
}
exports.encodeDecode = encodeDecode;
function metaToObject(metaClass, value) {
    // Default conversion options - use Strings for "Long" values and ignore unset "repeated" fields
    return metaClass.toObject(value, { arrays: false, longs: String });
}
exports.metaToObject = metaToObject;
// Checks if the provided code is valid according to ISO 3166-1 alpha-2 standard
function isValidCountryCode(code) {
    return i18n_iso_countries_1.default.getAlpha2Codes()[code] !== undefined;
}
exports.isValidCountryCode = isValidCountryCode;
// Checks if the provided code is valid according to ISO 639-1 standard
function isValidLanguageCode(code) {
    return iso_639_1_1.default.validate(code);
}
exports.isValidLanguageCode = isValidLanguageCode;
// According to ISO 3166-2 standard
function isValidSubdivisionCode(code) {
    return !!iso_3166_2_1.default.subdivision(code);
}
exports.isValidSubdivisionCode = isValidSubdivisionCode;
