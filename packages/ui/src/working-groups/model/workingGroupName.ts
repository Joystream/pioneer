import { capitalizeFirstLetter } from '@/common/helpers'

const exceptionWorkingGroupNames = ['operations-beta', 'operations-gamma', 'operations-alpha']

export const urlParamToWorkingGroupId = (name: string) => {
  if (exceptionWorkingGroupNames.includes(name)) {
    const splittedName = name.split('-')
    return `${splittedName[0]}WorkingGroup${capitalizeFirstLetter(splittedName[1])}`
  }

  return `${name.replace(/-([a-z])/g, (match, firstLetter) => firstLetter.toUpperCase())}WorkingGroup`
}

export const groupNameToURLParam = (name: string) => name.toLowerCase().replace(/ /g, '-')
