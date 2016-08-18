'use strict'

import React, {Component} from 'react-native'
import deepEqual from 'deep-equal'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'
import {fetchBuilds, buildsUrl} from '../reducers/tuning/filterActions'
import BuildItem from './BuildItem'
import PureListView from '../common/PureListView'

const filterHashSelector = (state) => (state.tuning.buildsFilterHash)
const buildsSelector = (state) => (state.entities.builds)
const buildsPaginationSelector = (state) => (state.pagination.buildsPagination)

const getBuildsEntities = createSelector (
  [filterHashSelector, buildsSelector, buildsPaginationSelector],
  (filterHash, buildsList, buildsPagination) => {
    let ids = buildsPagination[filterHash]?buildsPagination[filterHash].ids:[]
    return ids.map (id=>buildsList[id])
  }
)

const getBuildsPagination = createSelector (
  [filterHashSelector, buildsPaginationSelector],
  (filterHash, buildsPagination) => {
    return buildsPagination[filterHash] || {}
  }
)

const mapStateToProps = (state) => {
  return {
    buildsList: getBuildsEntities (state),
    buildsPagination: getBuildsPagination (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNextPage: (pageUrl) => {
      dispatch (fetchBuilds (pageUrl))
    }
  }
}

class BuildsList extends Component {
  _innerRef: ?PureListView;

  constructor (props) {
    super (props)
    this.state = {
      buildsList: props.buildsList,
      buildsPagination: props.buildsPagination
    }
    this._innerRef = null;
    this.renderRow = this.renderRow.bind(this);
    this.storeInnerRef = this.storeInnerRef.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    let {buildsList, buildsPagination} = this.props,
        nextBuildsList = nextProps.buildsList,
        nextPagination = nextProps.buildsPagination,
        trimEqual = deepEqual (buildsList, nextBuildsList),
        paginationEqual = deepEqual (buildsPagination, nextPagination)

    if (!paginationEqual)
      this.setState ({buildsPagination: nextPagination})
    if (!trimEqual)
      this.setState ({buildsList: nextBuildsList})
  }


  render () {

    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.buildsList}
        renderRow={this.renderRow}
        {...this.props}
      />
    )
  }
  renderRow (buildData, rowId) {
    return (
      <BuildItem key={rowId} data={buildData || {}} onPress={()=>Actions.Order ({...buildData})}/>
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

export default connect (mapStateToProps, mapDispatchToProps) (BuildsList)
