
import React, {PropTypes} from 'react'
import _ from 'lodash/fp'

import {ExampleLayout} from './ExampleLayout'
import {Page404} from '../Page404'

import * as _examples from '../examples'
import * as kExamples from '../kExamples'

const examples = {
  ..._examples,
  ...kExamples,
}

export const ExamplesViewer = props => {
  const exampleProps = examples[props.routerSubSection]
  const DataVis = examples[props.routerSubSection] && examples[props.routerSubSection].DataVis
  if (!DataVis) return <Page404/>
  return (
    <ExampleLayout {...props} {...exampleProps}>
      <DataVis {..._.omit('theme', props)}/>
    </ExampleLayout>
  )
}
ExamplesViewer.propTypes = {
  routerSubSection: PropTypes.string,
}