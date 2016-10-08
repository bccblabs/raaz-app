'use strict'

const {Record, OrderedSet, Map} = require ('immutable')

const InitialState = Record ({
  parts: new (Map),
  specs: new (Map),
  access_token: null,
})

export default InitialState
