'use strict'

import React, {Component, ListView} from 'react-native'
import deepEqual from 'deep-equal'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'

import {fetchParts, partsUrl} from '../reducers/tuning/filterActions'
import BuildItem from './BuildItem'
import PureListView from '../common/PureListView'


const filterHashSelector = (state) => (state.tuning.partsFilterHash)
const partsSelector = (state) => (state.entities.tuningItems)
const partsPaginationSelector = (state) => (state.pagination.partsPagination)

const getPartsEntities = createSelector (
  [filterHashSelector, partsSelector, partsPaginationSelector],
  (filterHash, partsList, partsPagination) => {
    let ids = partsPagination[filterHash]?partsPagination[filterHash].ids:[]
    return ids.map (id=>partsList[id])
  }
)

const getPartsPagination = createSelector (
  [filterHashSelector, partsPaginationSelector],
  (filterHash, partsPagination) => {
    return partsPagination[filterHash] || {}
  }
)

const mapStateToProps = (state) => {
  return {
    partsList: getPartsEntities (state),
    partsPagination: getPartsPagination (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNextPage: (pageUrl) => {
      dispatch (fetchParts (pageUrl))
    }
  }
}

class PartsList extends Component {
  _innerRef: ?PureListView;

  constructor (props) {
    super (props)
    this.state = {
      partsList: props.partsList,
      partsPagination: props.partsPagination
    }
    this._innerRef = null;
    this.renderRow = this.renderRow.bind(this);
    this.storeInnerRef = this.storeInnerRef.bind(this);

  }


  componentWillReceiveProps (nextProps) {
    let {partsList, partsPagination} = this.props,
        nextPartsList = nextProps.partsList,
        nextPagination = nextProps.partsPagination,
        trimEqual = deepEqual (partsList, nextPartsList),
        paginationEqual = deepEqual (partsPagination, nextPagination)

    if (!paginationEqual)
      this.setState ({partsPagination: nextPagination})
    if (!trimEqual)
      this.setState ({partsList: nextPartsList})
  }


  render () {

    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.partsList}
        renderRow={this.renderRow}
        {...this.props}
      />
    )
  }
  renderRow (partData, rowId) {
    return (
      <BuildItem data={partData || {}} onPress={()=>Actions.Order ({...partData})}/>
    )
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }


  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }

}

export default connect (mapStateToProps, mapDispatchToProps) (PartsList)
