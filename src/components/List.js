'use strict'

import React, {Component, ListView, Text, View} from 'react-native'

import F8Header from '../common/F8Header'
import TagsHeader from '../common/TagsHeader'
import ErrorView from '../common/ErrorView'
import LoadingView from '../components/LoadingView'

import {union, isEqual} from 'lodash'
import {Actions} from 'react-native-router-flux'
import {General, btnColor} from '../styles'


export default class List extends Component {

  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows ([]),
      data: [],
      pagination: props.pagination,
    }
  }

  componentDidMount () {
    let {fetchTags, fetchData, pagination} = this.props
    fetchTags && fetchTags ()
    fetchData (pagination.nextPageUrl)
  }

  componentWillReceiveProps (nextProps) {
    let {data, tags, pagination} = nextProps
    if (!isEqual(data, this.props.data)) {
      let newBlob = union (this.state.data, data)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (newBlob),
        data: newBlob,
        pagination,
      })
    }
  }

  render () {
    let {dataSource, pagination} = this.state
      , {title, fetchData, fetchTags, tags, renderRow} = this.props
      , {nextPageUrl, isFetching, hasError} = pagination
      , header = title?(<F8Header foreground="dark" title={title.toUpperCase()} leftItem={{title:'Back', onPress: Actions.pop}}/>):<View/>
      , content

      console.log ({nextPageUrl})
      if (isFetching) content = (<LoadingView/>)
      else if (hasError) {
        content = (<ErrorView
                    onPress={()=>{
                      fetchTags()
                      fetchData(nextPageUrl, specId, selectedTags)
                    }}
                    />)
      }
      else {
        content = (
          <ListView
            style={{flex: 1, backgroundColor: '#F5F5F5'}}
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={renderRow}
            onEndReached={()=>{
              if (nextPageUrl) { fetchData (nextPageUrl)}
            }}
          />
        )
      }

    return (
      <View style={{flex: 1, marginBottom: 50}}>
        {header}
        {tags && tags.length > 0 && <TagsHeader tags={tags} selectedTags={tags}
                    color={btnColor}/>}
        {content}
      </View>
    )
  }
}
