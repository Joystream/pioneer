import { GroupIdToGroupParam } from '../constants'

const exceptionWorkingGroupNames = ['hr', 'marketing', 'builders', 'apps']

export const urlParamToWorkingGroupId = (name: string) => {
  if (exceptionWorkingGroupNames.includes(name)) {
    switch (name) {
      case 'builders':
        return 'operationsWorkingGroupAlpha'
      case 'hr':
        return 'operationsWorkingGroupBeta'
      case 'marketing':
        return 'operationsWorkingGroupGamma'
      case 'apps':
        return 'appWorkingGroup'
      default:
        return name
    }
  }

  return `${name.replace(/-([a-z])/g, (match, firstLetter) => firstLetter.toUpperCase())}WorkingGroup`
}

export const groupNameToURLParam = (name: string) => name.toLowerCase().replace(/ /g, '-')

export const urlParamToOpeningId = (param: string) => {
  const [group, runtimeId] = param.split('-')
  return group in GroupIdToGroupParam ? param : `${urlParamToWorkingGroupId(group)}-${runtimeId}`
}
