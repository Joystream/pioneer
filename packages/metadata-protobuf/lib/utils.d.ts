import { AnyMessage, AnyMetadataClass, DecodedMetadataObject } from './types';
export declare function isSet<T>(v: T | null | undefined): v is T;
export declare function isEmptyObject<T>(object: T): boolean;
export declare function integrateMeta<T, Props extends readonly (keyof T & keyof M & string)[], M extends {
    [K in Props[number]]?: T[K] | null;
}>(object: T, meta: M, props: Props): void;
export declare function encodeDecode<T>(metaClass: AnyMetadataClass<T>, value: T): DecodedMetadataObject<T>;
export declare function metaToObject<T>(metaClass: AnyMetadataClass<T>, value: AnyMessage<T>): DecodedMetadataObject<T>;
export declare function isValidCountryCode(code: string): boolean;
export declare function isValidLanguageCode(code: string): boolean;
export declare function isValidSubdivisionCode(code: string): boolean;
