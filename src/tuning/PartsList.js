'use strict'

import React, {Component, ListView, Text, View} from 'react-native'

import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'

import Part from './Part'
import ErrorPage from '../common/ErrorPage'
import F8Header from '../common/F8Header'
import TagsHeader from '../common/TagsHeader'
import LoadingPage from '../components/LoadingPage'


import {fetchParts, togglePartTag} from '../reducers/tuning/filterActions'
import {partsBySpecIdSelector, partsPaginationSelector, selectedTagsSelector} from '../selectors'

import {union} from 'lodash'

import {General, btnColor} from '../styles'

const mapStateToProps = (state, props) => {
  return {
    parts: partsBySpecIdSelector (state, props),
    partsPagination: partsPaginationSelector (state, props),
    selectedTags: selectedTagsSelector (state, props),
    specId: props.specId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParts: (nextPageUrl, specId, selectedTags) => {
      dispatch (fetchParts (nextPageUrl, specId, selectedTags))
    }
  }
}



class PartsList extends Component {
  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [],
      dataSource: ds.cloneWithRows ([]),
      partsPagination: props.partsPagination,
    }
  }

  componentDidMount () {
    console.log (this.state, this.props)
    let {nextPageUrl} = this.state.partsPagination
      , {selectedTags, specId} = this.props

    this.props.fetchParts (nextPageUrl, specId, selectedTags)
  }

  componentWillReceiveProps (nextProps) {
    let {parts, partsPagination, selectedTags, specId} = nextProps
    if (nextProps.parts !== this.props.parts) {
      let newBlob = union (this.state.data, parts)
      this.setState ({
        data: newBlob,
        dataSource: this.state.dataSource.cloneWithRows (newBlob),
        partsPagination,
      })
    }
    if (selectedTags !== this.props.selectedTags) {
      this.props.fetchParts (undefined, specId, selectedTags)
      this.setState ({selectedTags, data: [], dataSource: this.state.dataSource.cloneWithRows([])})
    }
  }


  render () {
    console.log (this.props)
    let {dataSource, partsPagination, tags} = this.state
      , {title, fetchParts, specId, selectedTags} = this.props
      , {nextPageUrl, isFetching, hasError} = partsPagination
      , leftItem = {title: 'Back', onPress: Actions.pop}
      , rightItem = {title: 'Sort', onPress: Actions.SortParts}
      , header = (<F8Header foreground="dark" title={title.toUpperCase()} leftItem={leftItem} rightItem={rightItem}/>)
      , content

    if (isFetching) content = (<LoadingPage/>)
    else if (hasError) content = (<ErrorPage onPress={()=>fetchParts(nextPageUrl, specId, selectedTags)}/>)
    else {
      content = (
        <ListView
          style={{flex: 1, backgroundColor: '#F5F5F5'}}
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(data, rowId)=>{return (<Part data={data} specId={specId}/>)}}
          onEndReached={()=>{
            if (nextPageUrl) { fetchParts (nextPageUrl, specId, selectedTags)}
          }}
        />
      )
    }
    return (
      <View style={{flex: 1}}>
        {header}
        <TagsHeader tags={tags} selectedTags={selectedTags}
                    color={btnColor} tagAction={togglePartTag}/>
        {content}
      </View>
    )
  }

}

export default connect (mapStateToProps, mapDispatchToProps) (PartsList)
