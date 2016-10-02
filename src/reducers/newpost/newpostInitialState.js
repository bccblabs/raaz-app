'use strict'

const {Map, Record} = require ('immutable')

const newpostInitialState = Record ({

  pickedMake: '',
  pickedModel: '',
  pickedSubmodel: '',
  pickedSpecId: '',

  taggedCars: new (Map)
})

export default newpostInitialState
