'use strict'

import React, {
  Component,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import {Heading3, Paragraph} from '../common/F8Text'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'

import {Cell, Section, TableView} from 'react-native-tableview-simple'
import {FilterStyles} from '../styles'


const mapStateToProps = (state) => {
  return {
    profileData: state.user.profileData,
    loginType: state.user.loginType,
    access_token: state.history.access_token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

class Settings extends Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  componentWillMount () {
    let {profileData, loginType, access_token} = this.props
    this.setState ({profileData, loginType, access_token})
  }


  render () {
    const leftItem = { title: "Back", onPress:()=>{Actions.pop()}}
    return (
      <View>
        <F8Header
          foreground='dark'
          title="Settings"
          leftItem={leftItem}
          style={FilterStyles.headerStyle}/>
        <ScrollView>
        <View>
          <TableView style={{alignSelf: 'stretch'}}>
            <Section header="Social">
              <Cell cellstyle="RightDetail" accessory="DisclosureIndicator" title="Followers" detail={this.state.profileData.followers}/>
              <Cell cellstyle="RightDetail" accessory="DisclosureIndicator" title="Following" detail={this.state.profileData.following}/>
              <Cell cellstyle="RightDetail" accessory="DisclosureIndicator" title="Posts" />
            </Section>

            <Section header="Contact Info" footer="Only required if ordering/contacting dealers">
              <Cell cellstyle="leftDetail" accessory="DisclosureIndicator" title="Email" detail={this.state.profileData.email}/>
              <Cell cellstyle="leftDetail" accessory="DisclosureIndicator" title="Contact Phone" detail={this.state.profileData.contactPhone}/>
              <Cell cellstyle="leftDetail" accessory="DisclosureIndicator" title="Name" detail={this.state.profileData.name}/>
            </Section>

            <Section header="Social Accounts">

            </Section>

            <Section header="Other">
              <Cell cellstyle="leftDetail" accessoryColor="gray" accessory="Detail" title="User Agreement"/>
            </Section>

          </TableView>
        </View>
        </ScrollView>
      </View>
  )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Settings)
