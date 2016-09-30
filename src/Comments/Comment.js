'use strict'

import React, {
  Component,
  View
} from 'react-native'

import ProfilePicture from '../common/ProfilePicture'
import F8Button from '../common/F8Button'

import {PostStyles} from '../styles'

export default class Comment extends Component {
  render () {
    let {user, comment} = this.props.data
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={PostStyles.header}>
          <Image source={{uri:user.picture}} style={PostStyles.userPhotoStyle}/>
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
            <Text style={PostStyles.authorName}>{`${user.name}`}</Text>
            <Text style={PostStyles.created}>{`${daysAgo}`}</Text>
          </View>
        </View>

        <Text>{comment}</Text>
        <F8Button style={{}} type="tertiary" caption="10 likes"/>
      </View>
    )
  }
}
