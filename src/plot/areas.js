// Copyright 2018 Kensho Technologies, LLC.

import {get, each, eachRight, find, findIndex, head, isEmpty, isFinite, last, reject} from 'lodash'

import getMaxY from '../utils/rect/getMaxY'
import getPath2D from '../utils/getPath2D'
import notPlotNumber from '../utils/notPlotNumber'
import splitBy from '../utils/splitBy'

import getPlotValues from './getPlotValues'
import plotValue from './plotValue'

export function isPlotNumber(value) {
  return Array.isArray(value) ? value.some(isFinite) : isFinite(value)
}

function isNullPoint(props) {
  return (datum, idx) =>
    plotValue(props, datum, idx, 'x', null) === null ||
    plotValue(props, datum, idx, 'x0', null) === null ||
    plotValue(props, datum, idx, 'y', null) === null ||
    plotValue(props, datum, idx, 'y0', null) === null
}

export function getPointData(props, datum, yKey) {
  const path2D = getPath2D()
  const x = plotValue(props, datum, undefined, 'x')
  const y = plotValue(props, datum, undefined, yKey)
  const r = plotValue(props, datum, undefined, 'strokeWidth', 2) + 1.5
  if (notPlotNumber([x, y, r])) return undefined
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    hoverAlpha: 0.8,
    path2D,
    type: 'area',
  }
}

const getHoverSolverObj = (props, renderDatum, hoverData) => ({
  hoverRenderData: [
    renderDatum,
    getPointData(props, hoverData, 'y'),
    getPointData(props, hoverData, 'y0'),
  ],
  hoverData,
})

/* eslint-disable react/destructuring-assignment */

export function hoverSolver(props, _hoverData, renderDatum, localMouse) {
  const xRaw = props.xScale.invert(localMouse.x)
  if (props.xType === 'ordinal') {
    const hoverData = find(_hoverData, d => get(d, props.x) === xRaw)
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const hoverIndex = findIndex(_hoverData, d => get(d, props.x) > xRaw)
  if (hoverIndex === 0) {
    const hoverData = _hoverData[hoverIndex]
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  if (hoverIndex === -1) {
    const hoverData = last(_hoverData)
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const px = get(_hoverData[hoverIndex], props.x)
  const x = get(_hoverData[hoverIndex - 1], props.x)
  if (xRaw - px < x - xRaw) {
    const hoverData = _hoverData[hoverIndex - 1]
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const hoverData = _hoverData[hoverIndex]
  return getHoverSolverObj(props, renderDatum, hoverData)
}

function getAreaRenderData(props, data, idx) {
  if (isEmpty(data)) return {showHover: false}
  const path2D = getPath2D()
  path2D.moveTo(
    plotValue(props, head(data), idx, 'x', 0),
    plotValue(props, head(data), idx, 'y', 0)
  )
  each(data, d => {
    const x = plotValue(props, d, idx, 'x')
    const y = plotValue(props, d, idx, 'y')
    if (notPlotNumber([x, y])) return
    path2D.lineTo(x, y)
  })
  const y0 = plotValue(props, head(data), idx, 'y0')
  const x0 = plotValue(props, head(data), idx, 'x0')
  // if there's no base position accessors
  if (notPlotNumber(y0) && notPlotNumber(x0)) {
    const localY0 = props.yScale(0) || getMaxY(props.plotRect)
    path2D.lineTo(plotValue(props, last(data), idx, 'x', 0), localY0)
    path2D.lineTo(plotValue(props, head(data), idx, 'x', 0), localY0)
    // if the base is on the y axis
  } else if (isPlotNumber(y0) && notPlotNumber(x0)) {
    eachRight(data, d => {
      const x = plotValue(props, d, idx, 'x')
      const localY0 = plotValue(props, d, idx, 'y0')
      if (notPlotNumber([x, localY0])) return
      path2D.lineTo(x, localY0)
    })
    // if the base is on the x axis
  } else if (notPlotNumber(y0) && isPlotNumber(x0)) {
    eachRight(data, d => {
      const localX0 = plotValue(props, d, idx, 'x0')
      const y = plotValue(props, d, idx, 'y')
      if (notPlotNumber([localX0, y])) return
      path2D.lineTo(localX0, y)
    })
  }
  path2D.closePath()

  const values = getPlotValues(props, head(data), idx, {hoverAlpha: 0.25})
  return {
    ...values,
    data,
    hoverSolver,
    path2D,
    type: 'area',
  }
}

function splitDataAtNulls(props, data) {
  const checkNullPoint = isNullPoint(props)
  return reject(splitBy(data, checkNullPoint).map(arr => reject(arr, checkNullPoint)), isEmpty)
}

export default function areas(props) {
  if (!props.xScale || !props.yScale) return undefined
  const data = splitDataAtNulls(props, props.data)
  if (Array.isArray(head(data))) {
    return data.reduce((acc, datum, idx) => acc.concat(getAreaRenderData(props, datum, idx)), [])
  }
  return [getAreaRenderData(props, props.data)]
}
