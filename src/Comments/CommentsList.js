'use strict'
import React, {
  Component,
  ListView,
  View
} from 'react-native'

import Comment from './Comment'
import CreateComment from './CreateComment'
export default class CommentsList extends Compoenent {

  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      hasError: false,
      isLoading: true,
      dataSource: ds.cloneWithRows ([]),
      nextPageUrl: null
    }
    this.fetchCommentsByPost = this.fetchCommentsByPost.bind (this)
  }

  async fetchCommentsByPost () {
    try {
      let {postId} = this.props,
        , comments = await RequestUtils.fetchComments (postId)

      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (comments && comments.data)
        hasError: false,
        isLoading: false,
      })

    } catch (err) {
      this.setState ({
        hasError: true,
        isLoading: false
      })
    }
  }

  componentWillMount () {
    this.fetchCommentsByPost ()
  }

  render () {
    let {dataSource, isFetching, hasError} = this.state
      , content
    if (isFetching) content = (<FullScreenLoadingView/>)
    if (hasError) content = (<Text>{"Error Occurred..."}</Text>)
    if (!dataSource.getRowCount()) content = (<Text>{"0 Comments"}</Text>)
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
      {content}
      <CreateComment/>
      </View>
    )
  }
}
