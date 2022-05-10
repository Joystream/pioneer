export const capitalizeFirstLetter = <T extends string>(str: T) =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>

export const lowerFirstLetter = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1)

export { startCase as camelCaseToText } from 'lodash'

export const plural = (quantity?: unknown, suffix = 's') => (quantity === 1 ? '' : suffix)

export const cutText = (text: string, length = 100) => (text.length > length ? text.slice(0, length) + '...' : text)

export const isInFuture = (time: string) => {
  const timeAsDate = new Date(time).valueOf()
  return timeAsDate > Date.now()
}

export const nameMapping = (value: string) => {
  switch (value) {
    case 'Operations Alpha':
      return 'Builders'
    case 'Gateway':
      return 'Gateways'
    case 'Operations Beta':
      return 'HR'
    case 'Operations Gamma':
      return 'Marketing'
    default:
      return value
  }
}

export const subtitleMapping = (value: string) => {
  switch (value) {
    case 'Operations Alpha':
      return 'A diverse set of contributors, such as Developers, Designers and Product Managers, responsible for development of infrastructure and user facing applications.'
    case 'Storage':
      return 'Broadly responsible for ensuring storage infrastructure uptime, namely running complete and up-to-date copy of the content directory and accept inbound uploads from end users.'
    case 'Content':
      return 'Monitor publishing of the new content into the content directory, respond to the reported publications and adjudicate possible dispute processes.'
    case 'Distribution':
      return 'Run and maintain distributor nodes that deliver large volumes of upstream data to a large number of simultaneous end users.'
    case 'Gateway':
      return 'Gateways'
    case 'Operations Beta':
      return 'Human Resources working group is responsible for integrating new members greeting, onboarding, catalyzing and nurturing, as well as managing bounties.'
    case 'Operations Gamma':
      return 'Marketing group is responsible for increasing the outreach, sharing the content from the platform with the world, spreading the news about platform development, new members acquisition and overall growth.'
    case 'Membership':
      return 'Membership group is responsible for new memberships invitations, referral rewards for existing members and overall process of adding more members via referral scheme.'
    case 'Forum':
      return 'Monitor and supervise public communication channels for compliance with usage policies as decided through the governance system.'
    default:
      return value
  }
}
