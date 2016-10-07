'use strict'

import React, { Component, View, ListView, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'
import {EmptyHeading, Heading3} from '../common/F8Text'
import F8Button from '../common/F8Button'
import Build from './Build'
import {EmptyViewStyles, Titles} from '../styles'
import LoadingPage from '../components/LoadingPage'
import {fetchBuilds} from '../reducers/tuning/filterActions'
import {union} from 'lodash'

const specIdSelector = (state) => (state.stockCar.selectedSpecId)
const buildsSelector = (state) => (state.entities.builds)
const buildsPaginationSelector = (state) => (state.pagination.buildsPagination)


const getBuildsEntities = createSelector (
  [specIdSelector, buildsSelector, buildsPaginationSelector],
  (specId, buildsList, buildsPagination) => {
    let ids = buildsPagination[specId]?buildsPagination[specId].ids:[]
    return ids.map (id=>buildsList[id])
  }
)

const getBuildsPagination = createSelector (
  [specIdSelector, buildsPaginationSelector],
  (specId, buildsPagination) => {
    return buildsPaginationSelector[specId] || {}
  }
)


const mapStateToProps = (state) => {
  return {
    buildsList: getBuildsEntities(state),
    buildsPagination: getBuildsPagination(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuilds: (pageUrl) => {
      dispatch (fetchBuilds (pageUrl))
    }
  }
}

class BuildsList extends Component {

  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds,
      data: [],
      buildsPagination: props.buildsPagination
    }
    this.renderRow = this.renderRow.bind(this)
  }
  componentWillMount () {
    this.props.fetchBuilds()
  }

  componentWillReceiveProps (nextProps) {
    let {buildsList, buildsPagination} = nextProps
    if (nextProps.buildsList !== this.props.buildsList) {
      let newBlob = union (this.state.data, buildsList)
      this.setState ({
        data: newBlob,
        dataSource: this.state.dataSource.cloneWithRows (newBlob),
        buildsPagination
      })
    }
  }

  render () {
    let {dataSource, buildsPagination} = this.state
      , listContent = (
        <View>
        <Heading3 style={Titles.filterSectionTitle}>{"Builds"}</Heading3>
        <ListView
          style={{flex: 1, marginBottom: 50, backgroundColor: 'white'}}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderEmptyList={this._renderEmptyList}
          enableEmptySections={true}
          onEndReached={()=>{
            if (buildsPagination.nextPageUrl) {
              this.props.fetchBuilds (buildsPagination.nextPageUrl)
            }
          }}
        />
        </View>
      )
      , loadingContent = (
        <LoadingPage/>
      )
      , emptyContent = (
        <View style={EmptyViewStyles.container}>
        <TouchableWithoutFeedback onPress={()=>this.props.fetchBuilds()}>
          <EmptyHeading style={EmptyViewStyles.text}>
          {"No posts loaded, try loading again..."}
          </EmptyHeading>
        </TouchableWithoutFeedback>
        </View>
      )
    return listContent
  }

  renderRow (postData, rowId) {
    return (
      <Build data={postData}/>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (BuildsList)
