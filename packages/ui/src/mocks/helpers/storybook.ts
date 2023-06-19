import { merge as _merge } from 'lodash'

export const merge = <T>(...objs: T[]) => _merge({}, ...objs)
