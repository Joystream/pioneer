import {DECIMAL_NUMBER, DECIMAL_PLACES} from '@/common/model/formatters';

export const numberToInputWithDecimals = (value: number): string => (value / DECIMAL_NUMBER).toFixed(DECIMAL_PLACES)
