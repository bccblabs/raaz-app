'use strict'

import React, {
  Component,
  ListView,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'

import Comment from './Comment'
import CreateComment from './CreateComment'
import moment from 'moment'

import F8Header from '../common/F8Header'
import LikeBtn from '../common/LikeBtn'
import LoadingView from '../components/LoadingView'
import ErrorView from '../common/ErrorView'
import RequestUtils from '../requests'
import {PostStyles} from '../styles'

export default class CommentsList extends Component {

  constructor (props) {
    super (props)
    let dataSource = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      postId: props.postId,
      dataSource: dataSource.cloneWithRows ([]),
      isFetching: true,
      hasError: false,
      nextPageUrl: null,
    }

    this.fetchComments = this.fetchComments.bind (this)
  }

  async fetchComments () {
    try {
      let {postId} = this.state
        , data = await RequestUtils.fetchComments (postId)
        , dataSource = this.state.dataSource.cloneWithRows (data.comments)

      this.setState ({
        hasError: false,
        isLoading: false,
        data: data,
        dataSource: dataSource
      })
    } catch (err) {
      this.setState ({hasError: true, isLoading: false})
    }
  }

  componentWillMount () {
    this.fetchComments ()
  }

  render () {
    let {dataSource, isFetching, hasError} = this.state
      , content
      , leftItem = {title: 'Back', onPress:Actions.pop}
    if (isFetching) content = (<LoadingView/>)
    else if (hasError) content = (<ErrorView onPress={this.fetchComments}/>)
    else {
      content =  (
        <ListView
          style={{flex: 1, backgroundColor: '#F5F5F5'}}
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(data, rowId)=>{return (<Comment data={data}/>)}}
        />
      )
    }

    return (
      <View style={{flex: 1}}>
      <F8Header foreground="dark" leftItem={leftItem} title="Comments"/>
      {content}
      <CreateComment/>
      </View>
    )
  }
}
