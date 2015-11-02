
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {Block} from '@luiscarli/display'
import ContextMenuItem from '../ContextMenuItem'

import stateHOC from '../../utils/stateHOC'
import defaultTheme from '../defaultTheme'

const handleContextMenuItemUpdate = (props, childProps) => {
  if (!childProps.clicked) return
  props.onUpdate({
    ...props,
    selected: childProps.text,
  })
}

const ContextMenu = props => (
  <Block
    background='hsla(0, 0%, 93%, 0.9)'
    borderRadius={5}
    boxShadow='1px 1px 10px hsla(0, 0%, 0%, 0.8)'
    fontFamily={props.theme.font}
    fontSize={props.theme.fontSize}
    left={100}
    padding='5px 0px'
    position='absolute'
    top={100}
  >
    {_.map(props.items, (d, i) => (
      <ContextMenuItem
        key={i}
        onUpdate={handleContextMenuItemUpdate.bind(null, props)}
        text={d}
        theme={props.theme}
      />
    ))}
  </Block>
)
ContextMenu.propTypes = {
  onUpdate: PropTypes.func,
  theme: PropTypes.object,
}
ContextMenu.updateOnlyTypes = {
  selected: PropTypes.bool,
}
ContextMenu.canUpdate = [
  'selected',
]
ContextMenu.defaultProps = {
  theme: defaultTheme,
}

const defaultProps = {
  items: ['Edit Label', 'Delete Label'],
}

export default stateHOC(ContextMenu, defaultProps)