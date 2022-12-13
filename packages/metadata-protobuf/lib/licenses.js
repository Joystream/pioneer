"use strict";
// Helper methods to handle joystream defined license types
// This should be factored out into a separate package
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomKnownLicense = exports.createKnownLicenseFromCode = exports.getLicenseCodeByName = exports.KnownLicenses = exports.CUSTOM_LICENSE_CODE = void 0;
const KnownLicenses_json_1 = __importDefault(require("./KnownLicenses.json"));
const index_1 = require("../compiled/index");
exports.CUSTOM_LICENSE_CODE = 1000;
exports.KnownLicenses = new Map();
KnownLicenses_json_1.default.forEach((license) => {
    exports.KnownLicenses.set(license.code, license);
});
function getLicenseCodeByName(name) {
    for (const [code, license] of exports.KnownLicenses) {
        if (license.name === name)
            return code;
    }
}
exports.getLicenseCodeByName = getLicenseCodeByName;
function createKnownLicenseFromCode(code, attribution) {
    if (code === exports.CUSTOM_LICENSE_CODE) {
        throw new Error('Use createCustomLicense() instead');
    }
    const knownLicense = exports.KnownLicenses.get(code);
    if (!knownLicense) {
        throw new Error('Unknown License Code');
    }
    const license = new index_1.License({ code });
    if (knownLicense.attributionRequired) {
        if (attribution === undefined) {
            throw new Error('Attribution required for selected license');
        }
        license.attribution = attribution;
    }
    return license;
}
exports.createKnownLicenseFromCode = createKnownLicenseFromCode;
function createCustomKnownLicense(customText) {
    return new index_1.License({ code: exports.CUSTOM_LICENSE_CODE, customText });
}
exports.createCustomKnownLicense = createCustomKnownLicense;
exports.default = {
    CUSTOM_LICENSE_CODE: exports.CUSTOM_LICENSE_CODE,
    KnownLicenses: exports.KnownLicenses,
    createCustomKnownLicense,
    createKnownLicenseFromCode,
    getLicenseCodeByName,
};
