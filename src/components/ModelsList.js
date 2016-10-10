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
import LoadingView from './LoadingView'
import MultipleChoice from 'react-native-multiple-choice'
import SpecsHistoryHeader from './SpecsHistoryHeader'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import {createSelector} from 'reselect'
import {fetchSubmodels, setModel} from '../reducers/stockCar/filterActions'

const mapStateToProps = (state) => {
  return {
    models: keys(state.entities.models).sort(),
    selectedMake: state.stockCar.selectedMake,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubmodels: (make, model) => {
      dispatch (fetchSubmodels (make, model))
    },
    setModel: (model) => {
      dispatch (setModel (model))
    }
  }
}

class ModelsList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      models: props.models,
      selectedMake: props.selectedMake,
      isFetching: true,
    }
  }

  componentWillMount () {
    let {models, selectedMake, fetchSubmodels} = this.props
    this.setState ({models, selectedMake, isFetching: true})
  }


  componentWillReceiveProps (nextProps) {
    let {models, selectedMake} = nextProps,
        isFetching = models.length?false:true
    this.setState ({models, selectedMake, isFetching})
  }

  render () {
    let {models, selectedMake, isFetching} = this.state,
        {fetchSubmodels, setModel} = this.props
    const leftItem = {
            title: 'Makes',
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<LoadingView/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.models}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  setModel (option)
                  fetchSubmodels (selectedMake, option)
                  Actions.Submodels()
                }}/>
            </ScrollView>
          )

    return (
      <View style={FilterStyles.container}>
        <F8Header
          foreground="dark"
          title={this.state.selectedMake.toUpperCase()}
          leftItem={leftItem}
          style={FilterStyles.headerStyle}/>
          <SpecsHistoryHeader/>
          {content}
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ModelsList)
