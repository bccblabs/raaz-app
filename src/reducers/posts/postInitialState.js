'use strict'

const {List, Record} = require ('immutable')
const postInitialState = Record ({
  tags: new (List),
  postsFilterHash: '',
})

export default postInitialState
