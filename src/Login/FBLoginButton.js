'use strict';

import React, {Component, Image, StyleSheet, TouchableOpacity} from 'react-native'
import F8Button from '../common/F8Button'
const { loginWithFacebook } = require('../reducers/user/userActions');
const {connect} = require('react-redux');
import {Styles} from '../styles'
class FBLoginButton extends Component {
  props: {
    style: any;
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };
  state: {
    isLoading: boolean;
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <F8Button type="tuning" style={Styles.loginButton} caption="Loading..."/>
      )
    }

    return (
      <F8Button type="tuning" style={Styles.loginButton} onPress={() => this.logIn()} caption="Facebook"/>
    )
  }

  async logIn() {
    const {dispatch, onLoggedIn} = this.props;

    this.setState({isLoading: true});
    try {
      await Promise.race([
        dispatch(loginWithFacebook()),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      this._isMounted && this.setState({isLoading: false});
    }

    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

var styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 8,
  }
});

module.exports = connect()(FBLoginButton);
