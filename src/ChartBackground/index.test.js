
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'
import {DEFAULT_THEME as theme} from '../defaultTheme'
import {PLOT_RECT} from '../Chart/defaults'

import ChartBackground, {
  getBackground,
  getXGuides,
  getYGuides,
  getXText,
  getYText,
  getBackgroundRenderData,
} from './'

test('ChartBackground', () => {
  const component = shallowRender(
    <ChartBackground/>
  )
  assert.deepEqual(component.type.displayName, 'Block')
})
test('ChartBackground.getBackground', () => {
  const props = {
    theme,
  }
  const background = getBackground(props)
  assert.deepEqual(
    background.type,
    'area'
  )
  assert.deepEqual(
    background.fill,
    theme.axis.background
  )
})
test('ChartBackground.getXGuides', () => {
  const props = {
    theme,
    dimensions: ['x'],
    xTicks: [{value: 10}],
    xScale: d => d,
    plotRect: PLOT_RECT,
  }
  const xGuides = getXGuides(props)
  assert.deepEqual(
    xGuides[0].type,
    'line'
  )
})
test('ChartBackground.getYGuides', () => {
  const props = {
    theme,
    dimensions: ['y'],
    yTicks: [{value: 10}],
    yScale: d => d,
    plotRect: PLOT_RECT,
  }
  const yGuides = getYGuides(props)
  assert.deepEqual(
    yGuides[0].type,
    'line'
  )
})
test('ChartBackground.getXText', () => {
  const props = {
    theme,
    dimensions: ['x'],
    xTicks: [{value: 10}],
    xScale: d => d,
    plotRect: PLOT_RECT,
  }
  const xGuides = getXText(props)
  assert.deepEqual(
    xGuides[0].type,
    'text'
  )
})
test('ChartBackground.getYText', () => {
  const props = {
    theme,
    dimensions: ['y'],
    yTicks: [{value: 10}],
    yScale: d => d,
    plotRect: PLOT_RECT,
  }
  const yGuides = getYText(props)
  assert.deepEqual(
    yGuides[0].type,
    'text'
  )
})
test('ChartBackground.getBackgroundRenderData', () => {
  const props = {
    theme,
  }
  const backgroundRenderData = getBackgroundRenderData(props)
  assert.deepEqual(
    backgroundRenderData[0].type,
    'area'
  )
})