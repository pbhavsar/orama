// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'

import * as CustomPropTypes from '../CustomPropTypes'
import Canvas from '../canvas/Canvas'
import basicRender from '../canvas/basicRender'

export default function ChartLayers(props) {
  const {renderLayers, rootProps, theme} = props
  return map(renderLayers, (renderLayer, i) => (
    <Canvas
      clip
      height={rootProps.height}
      key={i}
      layerProps={renderLayer.layerProps}
      plotRect={rootProps.plotRect}
      render={basicRender}
      renderData={renderLayer.renderData}
      theme={theme}
      width={rootProps.width}
    />
  ))
}

ChartLayers.propTypes = {
  renderLayers: PropTypes.arrayOf(PropTypes.object),
  rootProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  theme: CustomPropTypes.theme.isRequired,
}
