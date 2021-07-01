import { Colors } from '@/common/constants'

export const StepperTheme = {
  light: {
    stepperBackground: Colors.White,
    stepperTitle: Colors.Black[900],
    stepperTitleFontWeight: 700,
    stepperLine: Colors.Black[300],
    stepperPastBackground: Colors.Black[400],
    stepperActiveTitle: Colors.Black[900],
    stepperActiveTitleTextStroke: 'transparent',
  },
  dark: {
    stepperBackground: Colors.Black[800],
    stepperTitle: Colors.Black[300],
    stepperTitleFontWeight: 400,
    stepperLine: Colors.Black[600],
    stepperPastBackground: Colors.Black[500],
    stepperActiveTitle: Colors.White,
    stepperActiveTitleTextStroke: Colors.White,
  },
}
