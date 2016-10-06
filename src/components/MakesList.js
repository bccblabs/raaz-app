'use strict'

import React, {
  Component,
  View,
  ScrollView,
  Text
} from 'react-native'

import { FilterStyles } from '../styles'

import keys from 'lodash/keys'
import union from 'lodash/union'
import F8Header from '../common/F8Header'
import LoadingPage from './LoadingPage'
import MultipleChoice from 'react-native-multiple-choice'

import { Map } from 'immutable'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { fetchMakes, fetchModels, setMake } from '../reducers/stockCar/filterActions'

const mapStateToProps = (state) => {
  return {
    selectedMake: state.stockCar.selectedMake,
    makes: keys (state.entities.makes).sort(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMakes: () => {
      dispatch (fetchMakes())
    },
    fetchModels: (makeName) => {
      dispatch (fetchModels(makeName))
    },
    setMake: (makeName) => {
      dispatch (setMake (makeName))
    }
  }
}


class MakesList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedMake: props.selectedMake,
      makes: this.props.makes,
      isFetching: true,
    }
  }

  componentWillMount () {
    let {makes, selectedMake, fetchMakes} = this.props
    this.setState ({makes, selectedMake})
    fetchMakes()
  }

  componentWillReceiveProps (nextProps) {
    let {makes, selectedMake} = nextProps,
        isFetching = makes.length?false:true
    this.setState ({makes, selectedMake, isFetching})
  }

  render () {
    let {makes, selectedMake, isFetching} = this.state
      , {setMake} = this.props
    const leftItem = {
            title: 'Cancel',
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<LoadingPage/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.makes}
                selectedOptions={[this.state.selectedMake]}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  this.props.fetchModels (option)
                  setMake (option)
                  this.setState ({selectedMake: [option]})
                  Actions.Models()
                }}/>
            </ScrollView>
          )

    return (
      <View style={FilterStyles.container}>
        <F8Header
          foreground="dark"
          title="Makes"
          leftItem={leftItem}
          style={FilterStyles.headerStyle}/>
          {content}
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (MakesList)
