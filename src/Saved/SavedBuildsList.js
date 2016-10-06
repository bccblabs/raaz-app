'use strict'

import React, {Component, ListView, Text, View} from 'react-native'
import LoadingPage from '../components/LoadingPage'
import ErrorPage from '../common/ErrorPage'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import RequestUtils from '../requests'
import Build from '../tuning/Build'

const mapStateToProps = (state) => {
  return {
    userId: state.user.profileData.user_id
  }
}

class SavedBuildsList extends Component {
  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      userId: this.props.userId,
      partTags: [],
      dataSource: ds.cloneWithRows ([]),
      isFetching: true,
      hasError: false,
      nextPageUrl: null,
    }
    this.fetchSavedBuildsFromUrl = this.fetchSavedBuildsFromUrl.bind (this)
  }

  async fetchSavedBuildsFromUrl () {
    try {
      let {userId, partTags, nextPageUrl} = this.state
      let data = await RequestUtils.fetchSavedBuilds (userId, partTags, nextPageUrl)

      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (data && data.builds || []),
        partTags: data && data.tags,
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
    this.fetchSavedBuildsFromUrl ()
  }

  render () {
    let {dataSource, isFetching, hasError} = this.state
      , content
    if (isFetching) content = (<LoadingPage/>)
    if (hasError) content = (<ErrorPage onPress={this.fetchSavedBuildsFromUrl}/>)
    else {
      content =  (
        <ListView
          style={{flex: 1, backgroundColor: '#F5F5F5'}}
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(data, rowId)=>{return (<Build data={data}/>)}}
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

export default connect () (SavedBuildsList)
