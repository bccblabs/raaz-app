'use strict'

import React, {
  Component,
  Image,
  Text,
  TextInput,
  View
} from 'react-native'

const userDataSelector = (state) => (state.user.profileData)

const mapStateToProps = (state) => {
  return {
    profileData: userDataSelector (state)
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
    return (
      <View>
      <TextInput
        placeholder="Write some comments..."
        placeholderColor="gray"
        multiline={true}
        maxLength={140}
        style={NewPostStyles.largeBlockInput}/>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (CreateComment)
