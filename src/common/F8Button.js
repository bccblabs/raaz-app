/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8Button
 * @flow
 */

'use strict';

var F8Colors = require('F8Colors');
var Image = require('Image');
var LinearGradient = require('react-native-linear-gradient');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');

class F8Button extends React.Component {
  props: {
    type: 'primary' | 'secondary' | 'bordered' | 'tuning' | 'tertiary';
    icon: number;
    caption: string;
    style: any;
    onPress: () => void;
  };

  render() {
    const caption = this.props.caption.toUpperCase();
    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={styles.icon} />;
    }
    let content;
    if (this.props.type === 'primary' || this.props.type === undefined) {
      content = (
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={['#6A6AD5', '#6F86D9']}
          style={[styles.button, styles.primaryButton]}>
          {icon}
          <Text style={[styles.caption, styles.primaryCaption]}>
            {caption}
          </Text>
        </LinearGradient>
      );
    } else if (this.props.type === 'error') {
      content = (
        <View style={styles.button}>
          {icon}
          <Text style={styles.errorCaption}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'tuning') {
      content = (
        <View style={[styles.button, border]}>
          {icon}
          <Text style={[styles.caption, styles.tuningCaption]}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'carTag') {
      content = (
        <View style={styles.carTag}>
          <Image source={this.props.icon} style={styles.tagIcon} />
          <Text style={[styles.caption, styles.carTagCaption]}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'spec') {
      content = (
        <View style={[styles.button,  {paddingHorizontal: 8,backgroundColor: 'white'}]}>
          <Text style={[styles.carTagCaption, {color: 'blue'}]}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'search') {
      content = (
        <View style={styles.search}>
          <Image source={this.props.icon} style={styles.tagIcon} />
          <Text style={[styles.caption, styles.carTagCaption]}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'tertiary') {
      content = (
        <View style={styles.tertiary}>
          <Image source={this.props.icon} style={styles.tagIcon} />
          <Text style={[styles.caption, styles.subTuningCaption]}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'liked') {
      content = (
        <View style={styles.tertiary}>
          <Image source={this.props.icon} style={styles.tagIcon} />
          <Text style={[styles.caption, styles.subTuningCaption, {color: 'red'}]}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'unsaved') {
      content = (
        <View style={[styles.button, {backgroundColor: 'blue'}]}>
          <Text style={[styles.caption, styles.subTuningCaption, {color: 'white'}]}>
            {caption}
          </Text>
        </View>
      );
    } else if (this.props.type === 'saved') {
      content = (
        <View style={[styles.button, {backgroundColor: 'red'}]}>
          <Text style={[styles.caption, styles.subTuningCaption, {color: 'white'}]}>
            {caption}
          </Text>
        </View>
      );

    } else {
      var border = this.props.type === 'bordered' && styles.border;
      content = (
        <View style={[styles.button, border]}>
          {icon}
          <Text style={[styles.caption, styles.secondaryCaption]}>
            {caption}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.container, this.props.style]}>
        {content}
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    // borderRadius: HEIGHT / 2,
    // borderWidth: 1 / PixelRatio.get(),
  },
  search: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 3,
    margin: 8,
    backgroundColor: 'lightgray',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  tagIcon: {
    height: 24,
    width: 24,
    flex: -1,
    margin: 4
  },
  carTag: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 3,
    backgroundColor: '#6A6AD5',
  },
  carTagCaption: {
    color: 'white',
    fontWeight: '600',
    fontSize: 8,
    padding: 3,
    alignSelf: 'center'
  },
  tertiary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  subTuningCaption: {
    color: 'black',
    fontWeight: '600',
    fontSize: 8,
    alignSelf: 'center'
  },
  border: {
    borderWidth: 1,
    borderColor: F8Colors.lightText,
    borderRadius: HEIGHT / 2,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  icon: {
    flex: -1,
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
  },
  tuningCaption: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  errorCaption: {
    color: 'black',
    fontSize: 10,
    flex: 1,
    fontWeight: 'bold'
  }
});

module.exports = F8Button;
