// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import CanvasInput, {getMouseFromEvent} from '../../src/CanvasInput'

test('CanvasInput', () => {
  const rootProps = {width: 500, height: 500, theme: {}}
  assert(shallowRender(<CanvasInput onUpdate={() => undefined} rootProps={rootProps} theme={{}} />))
})

test('CanvasInput/getMouseFromEvent 1', () => {
  assert.deepEqual(getMouseFromEvent({}), {x: undefined, y: undefined})
})

test('CanvasInput/getMouseFromEvent 2', () => {
  assert.deepEqual(getMouseFromEvent({touches: [{}]}), {x: undefined, y: undefined})
})
