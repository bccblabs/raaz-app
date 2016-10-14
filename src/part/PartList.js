'use strict'
import React, {Component} from 'react-native'
import List from '../components/List'
import Part from './Part'
export default class PartList extends Component {
  render () {
    return <List {...this.props} renderRow={(data, rowId)=>{return (<Part data={data} specId={this.props.specId}/>)}}/>
  }
}
