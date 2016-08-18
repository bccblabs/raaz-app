'use strict'
import React,
{
  Component,
  View
} from 'react-native'

import F8Header from '../common/F8Header'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'

import {Heading1, Heading2, Text, Paragraph} from '../common/F8Text'
class EventDetails extends Component {
  render () {
    const leftItem = {
            title: 'My Events',
            onPress: ()=>Actions.MyEvents()
          },
          rightItem = {
            title: 'Search',
            onPress: ()=>Actions.SearchEvents()
          },
          {name, date, description, address} = this.props.event,
          parallaxContent = (
            <View>
              <Heading1>{name}</Heading1>
              <Heading2>{address}</Heading2>
              <Text>{date}</Text>
            </View>
          )

    return (
      <ListContainer
        title="Events"
        backgroundColor="black"
        backgroundImage={require ('../images/Events.png')}
        parallaxContent={parallaxContent}
        selectedSegment={0}
        leftItem={leftItem}
        rightItem={rightItem}>
        <EventList/>
      </ListContainer>
    )
  }
}

export default connect () (Events)
