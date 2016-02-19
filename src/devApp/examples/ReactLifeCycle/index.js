/* eslint react/prop-types:0 */
/* eslint-disable */

export const title = 'React Life Cycle'
export const hide = true
export const tags = []
export const date = new Date('Feb 12, 2016')
export const description = ``
export code from '!!raw!./'

import React from 'react'

export const Component = React.createClass({
  statics: {
    customMethod: (a) => 12 + a,
  },
  componentWillMount() {
    console.log('componentWillMount Component ' + this.props.number)
  },
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps Component ' + this.props.number, this.props)
  },
  componentWillUpdate() {
    console.log('componentWillUpdate Component ' + this.props.number)
  },
  componentDidUpdate() {
    console.log('componentDidUpdate Component ' + this.props.number)
  },
  componentWillUnmount() {
    console.log('componentWillUnmount Component ' + this.props.number)
  },
  handleRef(node) {
    this.div = node
    console.log('compo', node, this)
  },
  componentDidMount() {
    console.log('componentDidMount Component ' + this.props.number)
  },
  render() {
    return <div ref={this.handleRef}>Test</div>
  }
})

export const DataVis = React.createClass({
  componentWillMount() {
    console.log('componentWillMount')
  },
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps', this.props)
  },
  componentWillUpdate() {
    console.log('componentWillUpdate')
  },
  componentDidUpdate() {
    console.log('componentDidUpdate')
  },
  componentWillUnmount() {
    console.log('componentWillUnmount')
  },
  handleRef(node) {
    this.component = node
    console.log(node, this)
  },
  componentDidMount() {
    console.log('componentDidMount')
  },
  render() {
    return (
      <div>
        <Component
          ref={(node) => this.handleRef(node)}
          number={1}
        />
        <Component ref='Component2' number={2}/>
      </div>
    )
  },
})
