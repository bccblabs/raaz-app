'use strict'

const {List, Record} = require ('immutable')

const stockCarFilterInitialState = Record ({

  selectedMake: '',
  selectedModel: '',
  selectedSubmodel: '',
  selectedSpecId: '',
  tags: new (List),
})

export default stockCarFilterInitialState
