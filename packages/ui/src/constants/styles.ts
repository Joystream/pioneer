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
    700.85: '#1F252ED9',
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

  Green: {
    900: '#061612',
    800: '#0A2C24',
    700: '#105746',
    600: '#12836A',
    500: '#4DCAB1',
    400: '#6FDFCB',
    300: '#8EE6D6',
    200: '#B0EFE4',
    100: '#CEF5EE',
    50: '#DDF9F4',
  },

  Red: {
    400: '#FF3960',
    300: '#FF6D87',
    200: '#F695A4',
    100: '#FFCBD9',
    50: '#FEEAF1',
  },
}

export const BorderRad = {
  s: '2px',
  m: '4px',
  full: '1000px',
  round: '50%',
}

export const Sizes = {
  selectHeight: '80px',
  accountHeight: '94px',
}

export const Shadows = {
  common: `0px 12px 28px ${Colors.Black[900.25]}`,
  light: `0px 0px 28px #D6D8E780`,
  select: `0px 20px 28px ${Colors.Black[900.25]}`,
}

export const Fonts = {
  Grotesk: '"Grotesk", sans-serif',
  Inter: '"Inter", sans-serif',
}

export const Transitions = {
  all: 'all 0.25s ease',
  duration: '0.25s',
  showResult: '1s',
}

export const Animations = {
  showSymbol: `
    animation: showSymbol ${Transitions.duration} ease;

    @keyframes showSymbol {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  showResultSymbol: `
    animation: showSymbol ${Transitions.showResult} ease;

    @keyframes showSymbol {
      0% {
        opacity: 0;
      }
      25% {
        opacity: 1;
      }
      75% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `,
  showSidePane: `
    animation: showSidePane ${Transitions.duration} ease;

    @keyframes showSidePane {
      0% {
        opacity: 0;
        transform: translateX(100%);
      }
      25% {
        opacity: 1;
      }
      100% {
        transform: translateX(0%);
      }
    }
  `,
  showModalBackground: `
    animation: showModalBackground ${Transitions.duration} ease;

    @keyframes showModalBackground {
      from {
        background-color: transparent;
      }
      to {}
    }
  `,
  showModalBlock: `
    animation: showModalBlock ${Transitions.duration} ease;

    @keyframes showModalBlock {
      from {
        opacity: 0;
        transform: translateY(-24px);
      }
      to {}
    }
  `,
}
