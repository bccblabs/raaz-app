'use strict'

const {List, Record} = require ('immutable')
const tuningFilterInitialState = Record ({
  buildTags: new (List),
  partTags: new (List),
})

export default tuningFilterInitialState
