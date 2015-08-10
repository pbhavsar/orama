/* @flow */

import React, { PropTypes } from 'react'
import R from 'ramda'

import Chart from './Chart'
/**
 * Funtions for the App component
 * @namespace .src/components/App
 */

/**
 * Generate random number between min (inclusive) and max (inclusive)
 *
 * @memberOf .src/components/App
 * @param  {number} min
 * @param  {number} max
 * @return {number}     random number
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

var styles = {
  appContainer: {
    maxWidth: 800,
    margin: 'auto',
    paddingTop: 50,
  },
}

/**
 * Generate random data
 * @memberOf .src/components/App
 *
 * @example
 * var dataArray = randomData()
 * dataArray.length
 * // 0
 * dataArray[0]
 * // { prop1: Number, prop2: Number, prop3: Number }
 *
 * @example
 * randomData()
 * // { prop1: Number, prop2: Number, prop3: Number }
 *
 * @return {Object} Object with random data
 */
function randomData() {
  return R.map(() => {
    return {
      prop1: randomInt(0, 100),
      prop2: randomInt(50, 200),
      prop3: randomInt(50, 200),
    }
  }, R.range(0, 100))
}
var dimensions = {
  x: {
    domain: [0, 100],
    name: 'prop1',
    selector: ['prop1'],
    type: 'linear',
  },
  y: {
    domain: [0, 100],
    name: 'prop2',
    selector: ['prop2'],
  },
}

/**
 * General component description.
 * @example blahblah
 */
export default React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.func,
  },
  render(): any {
    return (
      <div style={styles.appContainer}>
        <Chart
            data={randomData}
            dimensions={dimensions}
            size={{ width: 600, height: 400 }}
            />
      </div>
    )
  },
})
