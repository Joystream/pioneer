const exceptionWorkingGroupNames = ['hr', 'marketing', 'builders', 'gateways']

export const urlParamToWorkingGroupId = (name: string) => {
  if (exceptionWorkingGroupNames.includes(name)) {
    switch (name) {
      case 'builders':
        return 'operationsWorkingGroupAlpha'
      case 'hr':
        return 'operationsWorkingGroupBeta'
      case 'marketing':
        return 'operationsWorkingGroupGamma'
      case 'gateways':
        return 'gatewayWorkingGroup'
      default:
        return name
    }
  }

  return `${name.replace(/-([a-z])/g, (match, firstLetter) => firstLetter.toUpperCase())}WorkingGroup`
}

export const groupNameToURLParam = (name: string) => name.toLowerCase().replace(/ /g, '-')

/**
 *
 * @param name
 *  name has this shape workingGroupName-runtimeId
 * @returns
 *  workingGroupId
 */

export const urlParamToOpeningId = (name: string) => {
  const params = name.split('-')
  return `${urlParamToWorkingGroupId(params[0])}-${params[1]}`
}
