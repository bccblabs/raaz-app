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
import {resetPostFilters} from '../reducers/posts/postActions'
import {SliderStyles, Styles} from '../styles'
import Tag from '../filters/Tag'

const mapStateToProps = (state) => {
  return {
    postTagFilter: state.posts.postsFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetFilters: ()=> {
      dispatch (resetPostFilters())
    }
  }
}

class TagsHeader extends Component {
  constructor (props) {
    super (props)
    this.state = {selectedTags: props.postTagFilter}
  }

  componentWillReceiveProps (nextProps) {
    this.setState ({selectedTags: nextProps.postTagFilter})
  }
  render () {
    let {tags, tagAction, color} = this.props
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
      <TouchableOpacity
        accessibilityLabel="Clear filter"
        accessibilityTraits="button"
        style={styles.clear}
        onPress={this.props.resetFilters}>
        <Image source={require('../common/img/filter.png')} />
      </TouchableOpacity>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={SliderStyles.horizontalScrollContainer}
          contentContainerStyle={[Styles.scrollContainer, {justifyContent: 'center'}]}>
          {
            tags && tags.map ((tag, idx)=> {
              let isFilterSelected = (this.state.selectedTags.indexOf (tag) > -1)
              return ( <Tag touchEnabled={true} title={tag} key={idx} selected={isFilterSelected} action={tagAction(tag)}/>)
            })
          }
        </ScrollView>
      </View>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TagsHeader)

var styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 4,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
  clear: {
    paddingRight: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  filters: {
    color: 'rgba(255, 255, 255, 0.65)',
  }
});
