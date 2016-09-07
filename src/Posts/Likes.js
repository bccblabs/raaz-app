'use strict'

import React, {
  Component,
  View,
  ListView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import {connect} from 'react-redux'
import {likePost, unlikePost} from '../reducers/posts/postActions'
import {Like} from '../Posts/Like'
import RequestUtils from '../requests'

import F8Button from '../common/F8Button'
import Reload from '../common/Reload'
import FullScreenLoadingView from '../components/FullScreenLoadingView'

const mapStateToProps = (state) => {
  return {
    userId: state.userProfileData.user_id,
    likesPosts: state.likedPosts?state.likedPosts:[]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (postId, userId) => {
      dispatch (likePost (postId, userId))
    },
    unlikePost: (postId, userId) => {
      dispatch (unlikePost (postId, userId))
    },
    updateLikesPosts: (likePostsIds) => {
      dispatch (updateLikesPosts (likePostsIds))
    }
  }
}

class Likes extends Component {

  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      , { post, userId, likedPosts } = props

    this.state = {
      userId,
      likedPosts,
      dataSource: ds,
      data: [],
      postId: post.postId,
      nextPageUrl: '',
      hasError: false,
      isFetching: true,
    }

    this.fetchLikes = this.fetchLikes.bind (this)
    this.renderRow = this.renderRow.bind(this)
  }

  async fetchLikes () {
    try {
      let {postId, userId} = this.state
      let data = await RequestUtils.fetchLikes (postId, userId)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (data && data.likes),
        nextPageUrl: data.nextPageUrl,
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
    this.props.likePost (this.state.postId, this.state.userId)
    this.fetchLikes()
  }

  render () {
    let {likedPosts, postId, userId, isFetching, hasError, nextPageUrl, dataSource} = this.state
      , {likePost, unlikePost} = this.props
      , buttonContent = (likedPosts.indexOf (postId) > -1) ? (
        <F8Button
          type="secondary"
          caption="Liked!"
          onPress={()=>unlikePost(postId, userId)}
          style={[Styles.contactDealerButton]}/>
        ):(
        <F8Button
          type="secondary"
          caption="Like This"
          onPress={()=>likePost(postId, userId)}
          style={[Styles.contactDealerButton,{backgroundColor: 'gray'}]}/>
        )
      , content
      if (isFetching) content = (<FullScreenLoadingView/>)
      else if (hasError) content = (<Reload/>)
      else content = (<ListView
          style={{flex: 1, backgroundColor: '#F5F5F5'}}
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(data, rowId)=>{return (<Like key={`likes-${rowId}`} data={data}/>)}}
        />)
      )

    return (
      <View style={{flex: 1}}>
      {buttonContent}
      {content}
      </View>

    )
  }

}

export default connect (mapStateToProps, mapDispatchToProps) (Likes)
