export const urlParamToWorkingGroupName = (name: string) =>
  `${name.replace(/-([a-z])/g, (match, firstLetter) => firstLetter.toUpperCase())}WorkingGroup`
