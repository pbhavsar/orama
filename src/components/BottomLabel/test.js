
import test from 'tape'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import BottomLabel from './'

test('BottomLabel', t => {
  var component = renderComponent(<BottomLabel/>)
  t.equal(component.type, 'div')
  t.end()
})
