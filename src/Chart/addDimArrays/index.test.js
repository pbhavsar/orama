
import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'

import * as methods from './'
import {ACCESSORS_GROUPS} from '../defaults'

const data = [
  {p0: -1, p1: 1, p2: 'a', p3: new Date(2015, 1, 1)},
  {p0: -2, p1: 2, p2: 'b', p3: new Date(2015, 1, 2)},
  {p0: -3, p1: undefined, p2: 'c', p3: new Date(2015, 1, 3)},
]
const layerData = [
  {p10: 10, p2: 'aa', p3: new Date(2010, 1, 1)},
  {p10: 20, p2: 'bb', p3: new Date(2010, 2, 1)},
  {p10: 30, p2: 'cc', p3: new Date(2010, 3, 1)},
]
const props = {
  data,
  x0: 'p0',
  x: 'p1',
  y: 'p2',
  fill: 'p3',
  layers: [
    {
      data: layerData,
      x: 'p10',
      y: 'p2',
      fill: 'p3',
    },
  ],
}
test('Chart/addDimArrays.getDimArraysForLayer', () => {
  assert.deepEqual(
    methods.getDimArraysForLayer(methods.addLocalDimensionsToProps(props)),
    {
      fill: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
      ],
      x0: [-1, -2, -3],
      x: [1, 2],
      y: ['a', 'b', 'c'],
    }
  )
})
test('Chart/addDimArrays.omitGroups', () => {
  assert.deepEqual(
    methods.omitGroups(
      {
        fill: [
          new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
          new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
        ],
        x0: [-1, -2, -3],
        x: [1, 2, 10, 20, 30],
        y: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
      },
      ACCESSORS_GROUPS
    ),
    {
      fill: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
        new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
      ],
    }
  )
})
test('Chart/addDimArrays.mergeDimArrays', () => {
  assert.deepEqual(
    methods.mergeDimArrays(
      {},
      {
        fill: [
          new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
          new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
        ],
        x0: [-1, -2, -3],
        x: [1, 2, 10, 20, 30],
        y: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
      }
    ),
    {dimArrays: {
      fill: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
        new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
      ],
      x: [1, 2, 10, 20, 30, -1, -2, -3],
      y: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
    }, props: {}}
  )
})
test('Chart/addDimArrays.addDimArrays', () => {
  assert.deepEqual(
    methods.addDimArrays(methods.addLocalDimensionsToProps(props)),
    _.assign({}, props, {
      layers: [_.assign({}, props.layers[0], {
        localDefinedAccessors: {x: 'p10', y: 'p2', fill: 'p3'},
        localKeys: ['x', 'y', 'fill'],
      })],
      fillArray: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
        new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
      ],
      xArray: [1, 2, 10, 20, 30, -1, -2, -3],
      yArray: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
      groupedKeys: ['fill', 'x', 'y'],
      localDefinedAccessors: {x0: 'p0', x: 'p1', y: 'p2', fill: 'p3'},
      localKeys: ['x', 'x0', 'y', 'fill'],
    })
  )
})
test('Chart/addDimArrays.addDimArrays -> missing data 1', () => {
  const localProps = {
    layers: [
      {data: [{x: 1}], x: 'x'},
    ],
    x: '',
  }
  assert.deepEqual(
    methods.addDimArrays(methods.addLocalDimensionsToProps(localProps)),
    {
      layers: [{
        data: [{x: 1}],
        x: 'x',
        localDefinedAccessors: {x: 'x'},
        localKeys: ['x'],
      }],
      x: '',
      xArray: [1],
      groupedKeys: ['x'],
      localDefinedAccessors: {x: ''},
      localKeys: ['x'],
    }
  )
})
test('Chart/addDimArrays.addDimArrays -> missing data 2', () => {
  const localProps = {
    layers: [{
      x: 'x',
    }],
    data: [{x: 1}],
    x: 'x',
  }
  assert.deepEqual(
    methods.addDimArrays(methods.addLocalDimensionsToProps(localProps)),
    {
      layers: [{
        x: 'x',
        localDefinedAccessors: {x: 'x'},
        localKeys: ['x'],
      }],
      data: [{x: 1}],
      x: 'x',
      xArray: [1],
      groupedKeys: ['x'],
      localDefinedAccessors: {x: 'x'},
      localKeys: ['x'],
    }
  )
})
test('Chart/addDimArrays.addDimArrays -> missing data 3', () => {
  const localProps = {
    layers: [
      {x: 'x'},
    ],
    data: [{x: 1}],
    x: 'x',
    y: 'y',
  }
  assert.deepEqual(
    methods.addDimArrays(methods.addLocalDimensionsToProps(localProps)),
    {
      layers: [{
        x: 'x',
        localKeys: ['x'],
        localDefinedAccessors: {x: 'x'},
      }],
      data: [{x: 1}],
      x: 'x',
      y: 'y',
      xArray: [1],
      groupedKeys: ['x'],
      localDefinedAccessors: {x: 'x', y: 'y'},
      localKeys: ['x', 'y'],
    }
  )
})
test('Chart/addDimArrays.addDimArrays -> dont skip the zero', () => {
  const localProps = {
    data: [{x: 0}, {x: 1}, {x: 2}],
    x: 'x',
  }
  assert.deepEqual(
    methods.addDimArrays(methods.addLocalDimensionsToProps(localProps)),
    {
      data: [{x: 0}, {x: 1}, {x: 2}],
      x: 'x',
      xArray: [0, 1, 2],
      groupedKeys: ['x'],
      localDefinedAccessors: {x: 'x'},
      localKeys: ['x'],
    }
  )
})

test('addDimArrays.removeDimArrays', () => {
  assert.deepEqual(
    methods.removeDimArrays({
      groupedKeys: ['x', 'y'],
      xArray: [],
      yArray: [],
      fillArray: [],
    }),
    {
      groupedKeys: ['x', 'y'],
      fillArray: [],
    }
  )
})
