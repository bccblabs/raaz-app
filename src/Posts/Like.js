'use strict'

import React, {
  Component,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {PostStyles} from '../styles'

class Like extends Component {
    render () {
      let {data} = this.props
        , {picture, name, user_Id, created} = data
        , profilePicture = picture && <Image source={{uri: picture}} style={{borderWidth: 0.5, borderColor: 'white', width: 50, height: 50, borderRadius: 16, alignSelf: 'center'}}/>
      return (
        <TouchableOpacity onPress={()=>Actions.Profile({user_id})}>
          <View style={{flexDirection:'row', flex: 1}}>
            {profilePicture}
            <Text style={PostStyles.created}>{created}</Text>
          </View>
        </TouchableOpacity>
      )
    }
}
