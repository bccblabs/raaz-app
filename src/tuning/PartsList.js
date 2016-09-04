'use strict'

import React, {Component, ListView, Text, View} from 'react-native'
import FullScreenLoadingView from '../components/FullScreenLoadingView'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import RequestUtils from '../requests'
import Part from './Part'

class PartsList extends Component {
  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      specId: this.props.specId,
      tagName: this.props.tag,
      dataSource: ds.cloneWithRows ([]),
      isFetching: true,
      hasError: false,
      nextPageUrl: null,
    }
    this.fetchPartsFromUrl = this.fetchPartsFromUrl.bind (this)
  }

  async fetchPartsFromUrl (specId, tagName, pageUrl) {
    try {
      let data = await RequestUtils.fetchParts (specId, tagName, null)
      console.log (data)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (data && data.data[0] && data.data[0].parts),
        hasError: false,
        isFetching: false,
      })
    } catch (err) {
      console.error (err)
      this.setState ({
        hasError: true,
        isFetching: false
      })
    }
  }

  componentWillMount () {
    this.fetchPartsFromUrl (this.state.specId, this.state.tagName)
  }

  render () {
    let {dataSource, isFetching, hasError} = this.state
      , content
    if (isFetching) content = (<FullScreenLoadingView/>)
    if (hasError) content = (<Text>{"Error Occurred..."}</Text>)
    else {
      content =  (
        <ListView
          style={{flex: 1, backgroundColor: '#F5F5F5'}}
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(data, rowId)=>{return (<Part data={data}/>)}}
        />
      )
    }
    return (
      <View style={{flex: 1}}>
      {content}
      </View>
    )
  }

}

export default connect () (PartsList)
