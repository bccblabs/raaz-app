'use strict'

import React, {
  Component,
  View,
  ListView,
  Text
} from 'react-native'

import LoadingPage from '../components/LoadingPage'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import RequestUtils from '../requests'
import TuningCategoryCard from '../tuning/TuningCategoryCard'

export default class TuningCategoriesList extends Component {
  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      specId: props.specId?:props.specId:'',
      dataSource: ds.cloneWithRows ([]),
      isFetching: true,
      hasError: false,
    }
    this.fetchTuningCategories = this.fetchTuningCategories.bind (this)
  }

  async fetchTuningCategories () {
    try {
      let data = await RequestUtils.fetchTuningCategories (this.state.specId)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (data && data.tuningCategories)
        hasError: false,
        isFetching: false
      })
    } catch (err) {
      console.error (err)
      this.setState ({
        hasError: true,
        isFetching: false
      })
    }
  }

  componentWillMount () {
    this.fetchTuningCategories ()
  }

  render () {
    let {dataSource, isFetching, hasError} = this.state
      , content
    if (isFetching) content = (<LoadingPage/>)
    else if (hasError) content = (<Text>{"Error Occurred..."}</Text>)
    else {
      content =  (
        <ListView
          style={{flex: 1, backgroundColor: '#F5F5F5'}}
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(data, rowId)=>{return (<TuningCategoryCard data={data}/>)}}
        />
      )
    }
    return (
      <View style={{flex: 1}}>
      {content}
      </View>
    )
  }
}
