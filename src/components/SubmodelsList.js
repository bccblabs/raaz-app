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
import LoadingPage from './LoadingPage'
import ErrorPage from '../common/ErrorPage'
import MultipleChoice from 'react-native-multiple-choice'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { fetchSpecs, setSubmodel } from '../reducers/stockCar/filterActions'


const mapStateToProps = (state) => {
  return {
    submodels: keys(state.entities.submodels).sort(),
    selectedMake: state.stockCar.selectedMake,
    selectedModel: state.stockCar.selectedModel,
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
      isFetching: true,
    }
  }

  componentWillMount () {
    let {submodels, selectedMake, selectedModel} = this.props
    this.setState ({submodels, selectedMake, selectedModel, isFetching: true})
  }


  componentWillReceiveProps (nextProps) {
    let {submodels, selectedMake, selectedModel} = nextProps,
        isFetching = submodels.length?false:true
    this.setState ({submodels, selectedModel, selectedMake, isFetching})
  }

  render () {
    let {submodels, selectedMake, selectedModel, isFetching} = this.state,
        {fetchSpecs, setSubmodel} = this.props

    const leftItem = {
            title: 'Models',
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<LoadingPage/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.submodels}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  fetchSpecs (selectedMake, selectedModel, option)
                  setSubmodel (option)
                  this.setState ({selectedSubmodel: [option]})
                  Actions.Specs()
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
