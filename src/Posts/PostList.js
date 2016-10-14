'use strict'
import React, {Component} from 'react-native'
import List from '../components/List'
import Post from './Post'
export default class PostList extends Component {
  render () {
    return <List {...this.props} renderRow={(data, rowId)=>{return (<Post data={data}/>)}}/>
  }
}
