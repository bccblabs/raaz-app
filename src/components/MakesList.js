'use strict'

import React, {
  Component,
  View,
  ScrollView,
  Text
} from 'react-native'

import { FilterStyles, btnColor, Titles } from '../styles'

import F8Header from '../common/F8Header'
import LoadingView from './LoadingView'
import SpecsHistoryHeader from './SpecsHistoryHeader'

import MultipleChoice from 'react-native-multiple-choice'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { fetchMakes, fetchModels, setMake } from '../reducers/stockCar/filterActions'
import { makesSelector } from '../selectors'

const mapStateToProps = (state) => {
  return {
    makes: makesSelector (state),
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
      makes: this.props.makes,
      isFetching: true,
    }
  }

  componentWillMount () {
    let {makes, fetchMakes} = this.props
    this.setState ({makes})
    fetchMakes()
  }

  componentWillReceiveProps (nextProps) {
    let {makes} = nextProps,
        isFetching = makes.length?false:true
    this.setState ({makes, isFetching})
  }

  render () {
    let {makes, isFetching} = this.state
      , {setMake} = this.props

    const leftItem = {
            title: 'Cancel',
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<LoadingView/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.makes}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  this.props.fetchModels (option)
                  setMake (option)
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
          <SpecsHistoryHeader/>
          {content}
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (MakesList)
