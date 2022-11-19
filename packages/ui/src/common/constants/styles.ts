import { css } from 'styled-components'

export const Colors = {
  White: '#FFFFFF',
  Grey: '#8C96A6',
  LightGrey: '#A7AEB7',
  LogoPurple: '#4038FF',
  SkeletonGrey: '#ECEEEE',

  Black: {
    900: '#000000',
    850: '#0E0E0E',
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
    900.1: '#0000001A',
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
    300.4: '#817EFF66',
  },

  Green: {
    500: '#3DCFB3',
    400: '#62E1CA',
    400.4: '#62E1CA66',
    300: '#8EE6D6',
    200: '#B0EFE4',
    100: '#CEF5EE',
    50: '#DDF9F4',
  },

  Gray: {
    900: '#212121',
    700: '#616161',
  },

  Red: {
    500: '#F42E55',
    400: '#FF3960',
    400.4: '#FF396066',
    300: '#FF6D87',
    200: '#F695A4',
    100: '#FFCBD9',
    50: '#FEEAF1',
  },

  Orange: {
    500: '#FFAA02',
    400: '#FFBB33',
    400.4: '#FFBB3366',
    300: '#FFC654',
    200: '#FFDC98',
    100: '#FFEFCE',
    50: '#FFFAF0',
  },

  Purple: {
    200: '#bb6bd9',
  },

  Warning: {
    50: '#FFFAF0',
  },

  Negative: {
    50: '#FEEAF1',
    500: '#F42E55',
  },
}

export const ZIndex = {
  navbar: 70,
  navbarInner: 75,
  dropdown: 80,
  modal: 85,
  select: 60,
  contextMenu: 55,
  tooltip: 100,
  popover: 95,
  sideNotification: 90,
}

export const BorderRad = {
  s: '2px',
  m: '4px',
  l: '8px',
  full: '1000px',
  round: '50%',
}

export const Sizes = {
  selectHeight: '80px',
  accountHeight: '94px',
}

export const Shadows = {
  transparent: '0px 0px 0px rgba(0, 0, 0, 0)',
  focusDefault: '0px 0px 8px #817EFF66',
  focusInvalid: '0px 0px 8px #FF396066',
  focusWarning: '0px 0px 8px #FFBB3366',
  focusValid: '0px 0px 8px #62E1CA66',
  common: '0px 12px 28px #00000040',
  light: '0px 0px 28px #D6D8E780',
  select: '0px 8px 16px #0000001A',
  notification: '0px 4px 4px #00000040',
}

export const Fonts = {
  Grotesk: '"Grotesk", sans-serif',
  Inter: '"Inter", sans-serif',
}

export const Transitions = {
  all: 'all 0.25s ease',
  allXL: 'all 0.5s ease',
  allXXL: 'all 0.75s ease',
  durations: '0.1s',
  duration: '0.25s',
  durationXL: '0.5s',
  durationXXL: '0.75s',
  durationNumericS: 100,
  durationNumeric: 250,
  durationNumericXL: 500,
  durationNumericXXL: 750,
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
  showTooltip: `
    animation: showTooltip ${Transitions.durations} ease;

    @keyframes showHelperTooltip {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `,
  showNotification: `
    animation: showNotification ${Transitions.duration} ease;

    @keyframes showNotification {
      from {
        opacity: 0;
        transform: translateX(120%);
      }
      to {
        opactiy: 1;
        transform: translateX(0%);
      }
    }
  `,
}

export const Overflow = {
  DotsTwoLine: `
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    overflow: hidden;
  `,
  Dots: `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  FullDots: `
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
}

export const RemoveScrollbar = `
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const BulletPoint = css`
  position: relative;
  padding-left: 1em;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    top: 0;
  }
`
