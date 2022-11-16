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
      return 'Apps'
    case 'Operations Beta':
      return 'HR'
    case 'Operations Gamma':
      return 'Marketing'
    default:
      return value
  }
}

export const wgListItemMappings = (value: string) => {
  switch (value) {
    case 'Operations Alpha':
      return {
        subtitle:
          'A diverse set of contributors, such as Developers, Designers and Product Managers, responsible for development of infrastructure and user facing applications.',
        tooltipLink: undefined,
      }
    case 'Storage':
      return {
        subtitle:
          'Broadly responsible for ensuring storage infrastructure uptime, namely running complete and up-to-date copy of the content directory and accept inbound uploads from end users.',
        tooltipLink: undefined,
      }
    case 'Content':
      return {
        subtitle:
          'Monitor publishing of the new content into the content directory, respond to the reported publications and adjudicate possible dispute processes.',
        tooltipLink: undefined,
      }
    case 'Distribution':
      return {
        subtitle:
          'Run and maintain distributor nodes that deliver large volumes of upstream data to a large number of simultaneous end users.',
        tooltipLink: undefined,
      }
    case 'Gateway':
      return {
        subtitle:
          'Apps group runs multiple video streaming apps working on Joystream blockchain and provides support to all external app operators.',
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/gateways',
      }
    case 'Operations Beta':
      return {
        subtitle:
          'Human Resources working group is responsible for integrating new members greeting, onboarding, catalyzing and nurturing, as well as managing bounties.',
        tooltipLink: undefined,
      }
    case 'Operations Gamma':
      return {
        subtitle:
          'Marketing group is responsible for increasing the outreach, sharing the content from the platform with the world, spreading the news about platform development, new members acquisition and overall growth.',
        tooltipLink: undefined,
      }
    case 'Membership':
      return {
        subtitle:
          'Membership group is responsible for new memberships invitations, referral rewards for existing members and overall process of adding more members via referral scheme.',
        tooltipLink: undefined,
      }
    case 'Forum':
      return {
        subtitle:
          'Monitor and supervise public communication channels for compliance with usage policies as decided through the governance system.',
        tooltipLink: undefined,
      }
    default:
      return {
        subtitle: value,
        tooltipLink: undefined,
      }
  }
}
