
import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import ChartInput from './'

test('ChartInput', t => {
  var component = renderComponent(<ChartInput size={{width: 0, height: 0}}/>)
  t.equal(component.type, 'div')
  t.end()
})