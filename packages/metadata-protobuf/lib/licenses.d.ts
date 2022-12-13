import { License } from '../compiled/index';
export declare type LicenseCode = number;
export declare const CUSTOM_LICENSE_CODE: LicenseCode;
declare type KnownLicense = {
    code: LicenseCode;
    name: string;
    longName: string;
    description: string;
    url: string;
    attributionRequired: boolean;
};
export declare const KnownLicenses: Map<number, KnownLicense>;
export declare function getLicenseCodeByName(name: string): LicenseCode | undefined;
export declare function createKnownLicenseFromCode(code: LicenseCode, attribution?: string): License;
export declare function createCustomKnownLicense(customText: string): License;
declare const _default: {
    CUSTOM_LICENSE_CODE: number;
    KnownLicenses: Map<number, KnownLicense>;
    createCustomKnownLicense: typeof createCustomKnownLicense;
    createKnownLicenseFromCode: typeof createKnownLicenseFromCode;
    getLicenseCodeByName: typeof getLicenseCodeByName;
};
export default _default;
