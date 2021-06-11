export const urlParamToWorkingGroupId = (name: string) =>
  `${name.replace(/-([a-z])/g, (match, firstLetter) => firstLetter.toUpperCase())}WorkingGroup`

export const groupNameToURLParam = (name: string) => name.toLowerCase().replace(/ /g, '-')
