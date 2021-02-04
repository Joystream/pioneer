export const Colors = {
  White: '#FFFFFF',
  Grey: '#8C96A6',
  LogoPurple: '#4038FF',

  Black: {
    900: '#000000',
    800: '#131519',
    700: '#1F252E',
    600: '#404B5A',
    500: '#5D6B80',
    400: '#8C96A6',
    300: '#C4CCD6',
    200: '#DDE2EB',
    100: '#E8EDF6',
    75: '#EFF3FA',
    50: '#F6F8FC',
    25: '#F9FAFC',

    900.25: '#00000040',
    700.75: '#1F252EBF',
  },

  Blue: {
    900: '#001AE4',
    800: '#0027EA',
    700: '#002CEF',
    600: '#2734F8',
    500: '#3F38FF',
    400: '#6C6CFF',
    300: '#817EFF',
    200: '#A7AAFF',
    100: '#D3DAFF',
    50: '#E7EBFF',
  },
}

export const BorderRad = {
  s: '2px',
  m: '4px',
  full: '1000px',
  round: '50%',
}

export const Sizes = {
  accountSelectHeight: '80px',
  accountHeight: '94px',
}

export const Shadows = {
  common: `0px 12px 28px ${Colors.Black[900.25]}`,
  light: `0px 0px 28px #D6D8E780`,
  select: `0px 20px 28px ${Colors.Black[900.25]}`,
}

export const Fonts = {
  Body: 'Ubuntu, Arial, Helvetica, sans-serif',
  Monospace: '"Ubuntu Mono", monospace',
}

export const Transitions = {
  all: 'all 0.25s ease',
}
