const exceptionWorkingGroupNames = ['hr', 'marketing', 'builders']

export const urlParamToWorkingGroupId = (name: string) => {
  if (exceptionWorkingGroupNames.includes(name)) {
    switch (name) {
      case 'builders':
        return 'operationsWorkingGroupAlpha'
      case 'hr':
        return 'operationsWorkingGroupBeta'
      case 'marketing':
        return 'operationsWorkingGroupGamma'
      default:
        return name
    }
  }

  return `${name.replace(/-([a-z])/g, (match, firstLetter) => firstLetter.toUpperCase())}WorkingGroup`
}

export const groupNameToURLParam = (name: string) => name.toLowerCase().replace(/ /g, '-')
