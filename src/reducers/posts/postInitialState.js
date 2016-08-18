'use strict'

const {List, Record} = require ('immutable')
const postInitialState = Record ({
  postsFilter: new (List),
  postsFilterHash: '',
})

export default postInitialState
