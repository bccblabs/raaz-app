'use strict'

const {Record, OrderedSet, Map} = require ('immutable')

const InitialState = Record ({
  productIds: new (OrderedSet),
  specIds: new (OrderedSet),
  access_token: null,
})

export default InitialState
