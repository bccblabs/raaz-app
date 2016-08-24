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
import FullScreenLoadingView from './FullScreenLoadingView'
import MultipleChoice from 'react-native-multiple-choice'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import {createSelector} from 'reselect'
import {fetchSubmodels} from '../reducers/stockCar/filterActions'

const mapStateToProps = (state) => {
  return {
    models: keys(state.entities.models).sort(),
    selectedMake: state.stockCar.selectedMake,
    selectedModel: state.stockCar.selectedModel,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubmodels: (model) => {
      dispatch (fetchSubmodels (model))
    }
  }
}

class ModelsList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      models: props.models,
      selectedModel: props.selectedModel,
      selectedMake: props.selectedMake,
      isFetching: true,
    }
  }

  componentWillMount () {
    let {models, selectedMake, selectedModel, fetchSubmodels} = this.props
    this.setState ({models, selectedMake, selectedModel, isFetching: true})
  }


  componentWillReceiveProps (nextProps) {
    let {models, selectedModel, selectedMake} = nextProps,
        isFetching = models.length?false:true
    this.setState ({models, selectedModel, selectedMake, isFetching})
  }

  render () {
    let {models, selectedMake, selectedModel, isFetching} = this.state,
        {fetchSubmodels} = this.props
    const leftItem = {
            title: 'Makes',
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<FullScreenLoadingView/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.models}
                selectedOptions={[this.state.selectedModel]}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  fetchSubmodels (option)
                  this.setState ({selectedModel: [option]})
                  Actions.Submodels()
                }}/>
            </ScrollView>
          )

    return (
      <View style={FilterStyles.container}>
        <F8Header
          foreground="dark"
          title={this.state.selectedMake}
          leftItem={leftItem}
          style={FilterStyles.headerStyle}/>
          {content}
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ModelsList)
