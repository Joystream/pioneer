export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
export const lowerFirstLetter = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1)
export const camelCaseToText = (str: string): string => {
  return capitalizeFirstLetter(str.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1'))
}
