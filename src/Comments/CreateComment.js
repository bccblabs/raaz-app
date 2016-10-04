'use strict'

import React, {
  Component,
  Image,
  Text,
  TextInput,
  View
} from 'react-native'

import {profileSelector} from '../selectors'
import {postComment} from '../reducers/user/userActions'
import {connect} from 'react-redux'
import {NewPostStyles, PostStyles, ListingStyles} from '../styles'
import F8Button from '../common/F8Button'
const mapStateToProps = (state) => {
  return {
    profileData: profileSelector (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}


class CreateComment extends Component {
  constructor (props) {
    super (props)
    this.state = {
      text: ''
    }
  }

  render () {
    const {picture, name} = this.props.profileData
    return (
      <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8}}>
      <Image source={{uri: picture}} style={{flex: -1, height: 40, width: 40, resizeMode: 'cover'}}/>
      <TextInput
        placeholder="Write some comments..."
        placeholderColor="gray"
        multiline={true}
        maxLength={140}
        style={NewPostStyles.commentInput}/>
        </View>
      <F8Button style={NewPostStyles.postCommentBtn} caption="Post" type="secondary" icon={require ('../common/img/comment.png')}/>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (CreateComment)
