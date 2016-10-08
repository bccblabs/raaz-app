'use strict'
import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {SliderStyles, Styles} from '../styles'
import Tag from '../filters/Tag'


export default class TagsHeader extends Component {
  constructor (props) {
    super (props)
    this.state = {selectedTags: props.selectedTags, tags: props.tags}
  }

  componentWillReceiveProps (nextProps) {
    this.setState ({selectedTags: nextProps.selectedTags})
  }
  render () {

    console.log (this.state)
    let {selectedTags, tagAction, color} = this.props
      , {tags} = this.state
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <Image style={styles.clear} source={require('../common/img/filter.png')} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{marginHorizontal: 8}}
          contentContainerStyle={{justifyContent: 'center'}}>
          {
            tags && tags.map ((tag, idx)=> {
              if (tag.specId) {
                console.log ('tag', tag)
                return (
                  <Tag touchEnabled={true} title={tag.make + ' ' + tag.model + ' ' + tag.submodel}
                       key={idx} selected={true} action={tagAction ({specId: tag.specId})}
                   />)
              } else {
                let isFilterSelected = (this.state.selectedTags.indexOf (tag) > -1)
                return (
                  <Tag touchEnabled={true} title={tag}
                       key={idx} selected={isFilterSelected}
                      action={tagAction(tag)}
                  />)
              }
            })
          }
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
  clear: {
    marginHorizontal: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  filters: {
    color: 'rgba(255, 255, 255, 0.65)',
  }
});
