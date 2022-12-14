import { SUPPORTED_IMAGES } from '@/memberships/model/validation'

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
    case 'App':
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
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/builders',
      }
    case 'Storage':
      return {
        subtitle:
          'Broadly responsible for ensuring storage infrastructure uptime, namely running complete and up-to-date copy of the content directory and accept inbound uploads from end users.',
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/storage',
      }
    case 'Content':
      return {
        subtitle:
          'Monitor publishing of the new content into the content directory, respond to the reported publications and adjudicate possible dispute processes.',
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/content-directory',
      }
    case 'Distribution':
      return {
        subtitle:
          'Run and maintain distributor nodes that deliver large volumes of upstream data to a large number of simultaneous end users.',
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/storage#distributor',
      }
    case 'App':
      return {
        subtitle:
          'Apps group runs multiple video streaming apps working on Joystream blockchain and provides support to all external app operators.',
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/gateways',
      }
    case 'Operations Beta':
      return {
        subtitle:
          'Human Resources working group is responsible for integrating new members greeting, onboarding, catalyzing and nurturing, as well as managing bounties.',
        tooltipLink:
          'https://joystream.gitbook.io/testnet-workspace/testnet/council-period-scoring/human-resources-score',
      }
    case 'Operations Gamma':
      return {
        subtitle:
          'Marketing group is responsible for increasing the outreach, sharing the content from the platform with the world, spreading the news about platform development, new members acquisition and overall growth.',
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/marketers',
      }
    case 'Membership':
      return {
        subtitle:
          'Membership group is responsible for new memberships invitations, referral rewards for existing members and overall process of adding more members via referral scheme.',
        tooltipLink:
          'https://joystream.gitbook.io/testnet-workspace/testnet/council-period-scoring/human-resources-score',
      }
    case 'Forum':
      return {
        subtitle:
          'Monitor and supervise public communication channels for compliance with usage policies as decided through the governance system.',
        tooltipLink: 'https://joystream.gitbook.io/testnet-workspace/system/forum',
      }
    default:
      return {
        subtitle: value,
        tooltipLink: undefined,
      }
  }
}

export const fileToDataUrl = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result !== 'string') {
        return reject(new Error('Unable to read the file'))
      }
      resolve(result)
    }
    reader.readAsDataURL(file)
  })
}

export const resizeImageFile = async (
  file: File,
  width: number,
  height: number,
  type?: string
): Promise<Blob | null> => {
  if (!SUPPORTED_IMAGES.filter((type) => type !== 'image/svg+xml').includes(file.type)) {
    throw new Error('Wrong file type')
  }

  const dataUrl = await fileToDataUrl(file)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.height = height
      canvas.width = width
      const ctx = canvas.getContext('2d')

      const ratio = width / height
      const [clippedWidth, clippedHeight] =
        Math.abs(img.width - width) > Math.abs(img.height - height)
          ? [Math.floor(img.height * ratio), img.height]
          : [img.width, Math.floor(img.width / ratio)]
      const x = Math.floor(img.width / 2 - clippedWidth / 2)
      const y = Math.floor(img.height / 2 - clippedHeight / 2)

      ctx?.drawImage(img, x, y, clippedWidth, clippedHeight, 0, 0, width, height)
      ctx?.canvas.toBlob((blob) => resolve(blob), type ?? file.type)
    }
    img.src = dataUrl
  })
}
