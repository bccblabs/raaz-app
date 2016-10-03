'use strict'

import React, {
  Component,
  View,
} from 'react-native'

import F8Button from '../common/F8Button'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import MultipleChoice from 'react-native-multiple-choice'
import FullScreenLoadingView from '../components/FullScreenLoadingView'
import F8Header from '../common/F8Header'
import {General} from '../styles'
const mapStateToProps = (state) => {
  return {
    brands: state.entities.brands
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
class TagTuning extends Component {
  constructor (props) {
    super (props)
    this.state = {
      brands: props.brands,
      isFetching: props.isFetching,
      hasError: props.hasError,
    }
  }

  render () {
    let {makes, selectedMake, isFetching} = this.state
    const leftItem = {
            title: 'Cancel',
            onPress: ()=>Actions.pop()
          }

    return (
      <View style={{flex: 1}}>
        <F8Header
          foreground="dark"
          title="Parts"
          leftItem={leftItem}
          style={General.headerStyle}/>
        <F8Button
          onPress={Actions.SearchTuning} 
          caption="search" type="search"
          icon={require ('../common/img/search.png')}/>

      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TagTuning)
