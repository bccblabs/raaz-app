'use strict'

import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import F8Header from '../common/F8Header'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

const specIdSelector = (state) => (state.stockCar.selectedSpecId)
const tuningTagsSelector = (state) => (state.tuning.filterTags)
const tuningItemsSelector = (state) => (state.entities.tuningItems)
const tuningPaginationSelector = (state) => (state.pagination.partsPagination)

const getTuningPartsSelector = createSelector (
  [specIdSelector, tuningItemsSelector, partsPaginationSelector],
  (specId, tuningEntities, tuningPagination) => {

  }
)
const mapStateToProps = (state) => {
  return {
    specId: specIdSelector (state),
    tuningTags: tuningTagsSelector (state),
    tuningPagination: tuningPaginationSelector (state),
  }
}

class TuningPager extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isFetching: this.props.partsPagination
    }
  }

  componentWillMount () {

  }

  componentWillReceiveProps () {

  }

  render () {
    return (
      <View style={{flex: 1}}>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TuningPager)
