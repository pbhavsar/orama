// Copyright 2018 Kensho Technologies, LLC.

export const ACCESSORS_NAMES = [
  'x',
  'x0',
  'x1',
  'x2',
  'y',
  'y0',
  'y1',
  'y2',
  'radius',
  'fill',
  'stroke',
  'alpha',
  'lineWidth',
  'lineDash',
  'hoverStroke',
  'hoverFill',
]

export const ACCESSORS_NAMES_NON_SCALABLE = [
  'fillAlpha',
  'strokeAlpha',
  'hoverAlpha',
  'hoverLineWidth',
  'text',
  'rotate',
  'textAlign',
  'textBaseline',
  'textSnap',
  'xOffset',
  'yOffset',
  'font',
  'fontSize',
]

export const ACCESSORS_GROUPS = {
  x: ['x', 'x0', 'x1', 'x2'],
  y: ['y', 'y0', 'y1', 'y2'],
}

export const RANGE = [0, 1]
export const DOMAIN = [0, 1]
export const TYPE = 'linear'
export const NICE = false
export const TICK_COUNT = 1
export const TICK_X_SPACE = 150
export const TICK_Y_SPACE = 75

export const THEME = {
  fontFamily:
    '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
  fontFamilyMono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  titleFontWeight: 'bold',
  fontSize: 14,
  lineHeight: 1.5,
  textFill: 'hsl(0, 0%, 0%)',

  backgroundFill: 'hsla(0, 0%, 100%, 0)',
  plotBackgroundFill: 'hsl(0, 0%, 100%)',

  guideStroke: 'hsl(0, 0%, 80%)',
  guideLineWidth: 1,
  guideZeroStroke: 'hsl(0, 0%, 55%)',
  guideZeroLineWidth: 2,

  axisLabelFontSize: 14,
  axisLabelFontWeight: 'bold',
  axisTickFontSize: 12,
  axisTickTextFill: 'hsl(0, 0%, 0%)',

  tooltipFontSize: 13,
  tooltipTextFill: 'hsl(0, 0%, 0%)',
  tooltipTitleFontSize: 13,
  tooltipTitleFontWeight: 'bold',
  tooltipValueFontSize: 13,
  tooltipBackgroundFill: 'hsl(0, 0%, 80%)',
  tooltipEvenBackgroundFill: 'hsl(0, 0%, 75%)',
  tooltipBoxShadowFill: 'hsla(0, 0%, 0%, 0.5)',
  tooltipKeyBorderStroke: 'hsl(0, 0%, 40%)',

  plotFontSize: 13,
  plotFill: 'hsl(0, 0%, 20%)',
  plotLineWidth: 2,
  plotAlpha: 0.85,

  plotLinearRangeFill: ['#edf8b1', '#2c7fb8'],
  plotOrdinalRangeFill: [
    '#1b9e77',
    '#d95f02',
    '#7570b3',
    '#e7298a',
    '#66a61e',
    '#e6ab02',
    '#a6761d',
    '#666666',
  ],
}
