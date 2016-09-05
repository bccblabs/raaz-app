'use strict'
import React, {
  Component,
  Image,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import union from 'lodash/union'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {syncSpec} from '../reducers/history/historyActions'
import {Heading2, EmptyHeading, Paragraph} from '../common/F8Text'
import {SliderStyles, Styles} from '../styles'
import MetricsGraph from '../components/MetricsGraph'

const mapStateToProps = (state) => {
  return {
    userId: state.user.profileData.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSpecId: (userId, specId) => {
      dispatch (syncSpec (userId, specId))
    }
  }
}

class Spec extends Component {
  render () {
    let {spec, userId, saveSpecId} = this.props,
        {tags, media,
         cylinders, compressor, configuration, years,
         transmissionSpeed, transmission, drivenWheels, size,
         specId,
        } = spec,
        graphKeys = ['horsepower', 'torque']

    const dataArray = graphKeys.map ((key)=>{return {name: key, value: spec[key]}}),
          tagsArray = union (tags, years)

    compressor = compressor=='na'?'naturally aspirated':compressor

    return (
        <View style={styles.container}>
        <Text style={{marginLeft: 8, position: 'absolute', 'bottom': 0}}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`}</Text>
        </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: 'white'
  },
  elementContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 4,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: 'black',
  },
  clear: {
    paddingRight: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  filters: {
    color: 'rgba(255, 255, 255, 0.65)',
  },
  tagStyle: {
    padding: 5,
    margin: 4,
    borderRadius: 10,
    borderWidth: 2.3,
    backgroundColor: 'transparent',
  }
});

export default connect (mapStateToProps, mapDispatchToProps)(Spec)
