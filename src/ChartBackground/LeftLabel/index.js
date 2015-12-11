
import React, {PropTypes} from 'react'

import {Block} from 'react-display'
import {DEFAULT_THEME} from '../../defaultTheme'

/**
 * Component that position and style the bottom label of the `Chart` component
 */
export default React.createClass({
  displayName: 'LeftLabel',
  propTypes: {
    plotRect: PropTypes.object.isRequired,
    text: PropTypes.string,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      plotRect: {x: 0, y: 0, width: 0, height: 0},
      text: '',
      theme: {...DEFAULT_THEME},
    }
  },
  render() {
    const {plotRect, theme} = this.props
    return (
      <Block
        color={theme.axis.color}
        fontFamily={theme.font}
        fontSize={theme.fontSize}
        left={0}
        overflow={'hidden'}
        position={'absolute'}
        textAlign={'center'}
        textOverflow={'ellipsis'}
        top={plotRect.y}
        transform={'translate(-100%) rotate(-90deg)'}
        transformOrigin={'100% 0'}
        whiteSpace={'nowrap'}
        width={plotRect.height}
      >
        {this.props.text}
      </Block>
    )
  },
})