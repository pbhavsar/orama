
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from '@luiscarli/display'
import Annotation from '../Annotation'

import defaultTheme from '../defaultTheme'
const mapIndexed = R.addIndex(R.map)

const handleAnnotationUpdate = (props, annotationIdx) => {
  props.onUpdate('updateClickedIdx', annotationIdx)
}

/*
Used inside <ChartRender/>
can update: 'updateClickedIdx'
*/
const RenderAnnotation = props => (
  <Block
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    fontWeight='bold'
    height={props.size.height}
    overflow='hidden'
    pointerEvents='none'
    position='absolute'
    width={props.size.width}
  >
    {mapIndexed((d, i) => (
      <Annotation
        key={i}
        onUpdate={handleAnnotationUpdate.bind(null, props, i)}
        text={d.text}
        textAlign={d.textAlign}
        updateClicked={undefined}
        x={d.x}
        y={d.y}
      />
    ), props.annotationData)}
  </Block>
)

RenderAnnotation.propTypes = {
  annotationData: PropTypes.array,
  size: PropTypes.object.isRequired,
  theme: PropTypes.object,
  updateClickedIdx: PropTypes.number,
}

RenderAnnotation.defaultProps = {
  annotationData: [],
  theme: defaultTheme,
}

export default RenderAnnotation