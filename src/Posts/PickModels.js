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
import LoadingPage from '../components/LoadingPage'
import MultipleChoice from 'react-native-multiple-choice'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import {createSelector} from 'reselect'
import {fetchSubmodels} from '../reducers/stockCar/filterActions'
import {setModel} from '../reducers/newpost/newpostActions'

const mapStateToProps = (state) => {
  return {
    models: keys(state.entities.models).sort(),
    selectedMake: state.newpost.pickedMake,
    selectedModel: state.newpost.pickedModel,
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
        {fetchSubmodels, setModel} = this.props
    const leftItem = {
            title: 'Makes',
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<LoadingPage/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.models}
                selectedOptions={[this.state.selectedModel]}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  setModel (option)
                  fetchSubmodels (selectedMake, option)
                  this.setState ({selectedModel: [option]})
                  Actions.PickSubmodels()
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
          {content}
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ModelsList)
