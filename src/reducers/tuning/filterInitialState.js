'use strict'

const {List, Record} = require ('immutable')
const tuningFilterInitialState = Record ({
  filterTags: new (List),
})

export default tuningFilterInitialState
