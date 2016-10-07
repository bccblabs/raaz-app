'use strict'
import React, {Component, ListView, Text, View} from 'react-native'

import Part from '../tuning/Part'
import ErrorPage from '../common/ErrorPage'
import F8Header from '../common/F8Header'
import TagsHeader from '../common/TagsHeader'
import LoadingPage from '../components/LoadingPage'
import {union} from 'lodash'
import {Actions} from 'react-native-router-flux'
import {togglePartTag} from '../reducers/tuning/filterActions'
import {General, btnColor} from '../styles'

export default class PartsList extends Component {
  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [],
      dataSource: ds.cloneWithRows ([]),
      partsPagination: props.partsPagination,
      tags: props.tags,
      selectedTags: props.selectedTags
    }
  }

  componentDidMount () {
    let {nextPageUrl} = this.state.partsPagination
      , {selectedTags, specId, tags, dispatch} = this.props
    this.props.fetchParts (nextPageUrl, specId, selectedTags)
  }

  componentWillReceiveProps (nextProps) {
    let {parts, partsPagination, selectedTags, specId} = nextProps
    if (nextProps.parts !== this.props.parts) {
      this.setState ({
        data: parts,
        dataSource: this.state.dataSource.cloneWithRows (parts),
        partsPagination,
      })
    }
    if (selectedTags !== this.props.selectedTags) {
      this.props.fetchParts (undefined, specId, selectedTags)
      this.setState ({selectedTags, data: [], dataSource: this.state.dataSource.cloneWithRows([])})
    }
  }


  render () {
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
        {tags && <TagsHeader tags={tags} selectedTags={selectedTags}
                    color={btnColor} tagAction={togglePartTag}/>}
        {content}
      </View>
    )
  }

}
