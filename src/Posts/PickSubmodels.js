'use strict'

import React, {
  Component,
  View,
  ScrollView,
  Text
} from 'react-native'

import { FilterStyles } from '../styles'

import keys from 'lodash/keys'

import F8Header from '../common/F8Header'
import LoadingView from '../components/LoadingView'
import MultipleChoice from 'react-native-multiple-choice'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { fetchSpecs } from '../reducers/stockCar/filterActions'
import {setSubmodel} from '../reducers/newpost/newpostActions'

const mapStateToProps = (state) => {
  return {
    submodels: keys(state.entities.submodels).sort(),
    selectedMake: state.newpost.pickedMake,
    selectedModel: state.newpost.pickedModel,
    selectedSubmodel: state.newpost.pickedSubmodel,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (make, model, submodel) => {
      dispatch (fetchSpecs (make, model, submodel))
    },
    setSubmodel: (submodel) => {
      dispatch (setSubmodel (submodel))
    }
  }
}

class SubmodelsList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      submodels: props.submodels,
      selectedMake: props.selectedMake,
      selectedModel: props.selectedModel,
      selectedSubmodel: props.selectedSubmodel,
      isFetching: true,
    }
  }

  componentWillMount () {
    let {submodels, selectedMake, selectedModel, selectedSubmodel} = this.props
    this.setState ({submodels, selectedMake, selectedModel, isFetching: true})
  }


  componentWillReceiveProps (nextProps) {
    let {submodels, selectedMake, selectedModel, selectedSubmodel} = nextProps,
        isFetching = submodels.length?false:true
    this.setState ({submodels, selectedModel, selectedMake, isFetching, selectedSubmodel})
  }

  render () {
    let {submodels, selectedMake, selectedModel, selectedSubmodel, isFetching} = this.state,
        {fetchSpecs, setSubmodel} = this.props

    const leftItem = {
            title: 'Models',
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<LoadingView/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.submodels}
                selectedOptions={[this.state.selectedSubmodel]}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  fetchSpecs (selectedMake, selectedModel, option)
                  setSubmodel (option)
                  this.setState ({selectedSubmodel: [option]})
                  Actions.PickSpecs()
                }}/>
            </ScrollView>
          )

    return (
      <View style={FilterStyles.container}>
        <F8Header
          foreground="dark"
          title={this.state.selectedModel.toUpperCase()}
          leftItem={leftItem}
          style={FilterStyles.headerStyle}/>
          {content}
      </View>
    )
  }
}


export default connect (mapStateToProps, mapDispatchToProps) (SubmodelsList)
