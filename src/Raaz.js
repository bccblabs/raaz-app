'use strict'

import React,
{
  Navigator,
  Component,
  Text
} from 'react-native'

import RNRF, {
  Route,
  Schema,
  TabBar
} from 'react-native-router-flux'

import { connect } from 'react-redux'

import Posts from './Posts/'
import NewPost from './Posts/NewPost'
import Login from './Login'
import Profile from './Profile'
import Settings from './Profile/Settings'
import Events from './Events'
import Tuning from './tuning'
import PartDetails from './tuning/PartDetails'
import MakesList from './components/MakesList'
import ModelsList from './components/ModelsList'
import SubmodelsList from './components/SubmodelsList'
import SpecsList from './components/SpecsList'
import Notifications from './Notifications'
import TuningBySpec from './TuningBySpec'
import TuningPager from './tuning/TuningPager'
import Order from './Order'

import {computeFilterHash, fetchMakeModelYears, fetchStockCars, rootUrl} from './reducers/stockCar/filterActions'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.user_id
  }
}

class TabIcon extends Component {
  render() {
  return (
      <Text style={{color: this.props.selected ? 'black' :'gray'}}>{this.props.title}</Text>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default class Viicles extends Component {

  render () {
      const Router = connect() (RNRF.Router)
      return (
          <Router hideNavBar={true}>
            <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
      	    <Schema name="floatFromRight" type="jump" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
            <Schema name="default" hideNavBar={false}/>
            <Schema name="tab" type="jump" icon={TabIcon} hideNavBar={true}/>
            <Route name="Login" component={Login} title="Login" hideNavBar={true} schema="default"/>
            <Route name="tabBar" hideNavBar={true}>
              <Router footer={TabBar} showNavigationBar={false}>
                <Route name="Posts"
                  component={Posts}
                  key="posts"
                  title="Posts"
                  schema="tab"
                  hideNavBar={true}
                  initial={true}
                  iconName={"Posts"}/>
                <Route name="Tuning"
                  key="tuning"
                  component={Tuning}
                  title="Cars"
                  schema="tab"
                  hideNavBar={true}
                  iconName={"Cars"}/>
                <Route name="Notifications"
                  key="notifications"
                  component={Notifications}
                  title="Message"
                  schema="tab"
                  hideNavBar={true}
                  iconName={"Notifications"}/>
              </Router>
            </Route>

            <Route name="Profile" component={Profile} key="profile" title="Profile" schema="default" hideNavBar={true} />
            <Route name="Settings" component={Settings} title="Settings" hideNavBar={true} schema="default"/>
            <Route name="Makes" component={MakesList} title="Choose Makes" schema="floatFromRight" hideNavBar={true}/>
            <Route name="Models" component={ModelsList} title="Choose Models" schema="floatFromRight" hideNavBar={true}/>
            <Route name="Submodels" component={SubmodelsList} title="Choose Trims" schema="floatFromRight" hideNavBar={true}/>
            <Route name="Specs" component={SpecsList} title="Choose Specs" schema="floatFromRight" hideNavBar={true}/>
            <Route name="PartDetails" component={PartDetails} schema="default" hideNavBar={true}/>
            <Route name="Order" component={Order} schema="default" hideNavBar={true}/>
            <Route name="TuningBySpec" component={TuningBySpec} schema="default" hideNavBar={true}/>
            <Route name="NewPost" component={NewPost} schema="default" hideNavBar={true}/>
            <Route name="TuningPager" component={TuningPager} schema="default" hideNavBar={true}/>
          </Router>
      )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Viicles)
