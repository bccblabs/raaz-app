'use strict'

const {List, Record} = require ('immutable')

const stockCarFilterInitialState = Record ({

  selectedMake: '',
  selectedModel: '',
  selectedSubmodel: '',
  selectedSpecId: 'home',
  tags: new (List),
})

export default stockCarFilterInitialState
