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
 * @providesModule F8Text
 * @flow
 */

'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';
import F8Colors from './F8Colors';

export function Text({style, ...props}: Object): ReactElement {
  return <React.Text style={[styles.font, style]} {...props} />;
}

export function Heading1({style, ...props}: Object): ReactElement {
  return <React.Text style={[styles.font, styles.h1, style]} {...props} />;
}

export function Heading2 ({style, ...props}: Object): ReactElement {
  return <React.Text style={[styles.font, styles.h2, style]} {...props} />;
}

export function Heading3 ({style, ...props}: Object): ReactElement {
  return <React.Text style={[styles.font, styles.h3, style]} {...props} />;
}

export function EmptyHeading ({style, ...props}: Object): ReactElement {
  return <React.Text style={[styles.font, styles.emptyHeading, style]} {...props} />;
}

export function Paragraph({style, ...props}: Object): ReactElement {
  return <React.Text style={[styles.font, styles.p, style]} {...props} />;
}

const scale = Dimensions.get('window').width / 375;

function normalize(size: number): number {
  return Math.round(scale * size);
}

const styles = StyleSheet.create({
  font: {
    // fontFamily: 'FontAwesome',
  },
  h1: {
    fontSize: normalize(24),
    lineHeight: normalize(27),
    // color: F8Colors.darkText,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  h2: {
    fontSize: normalize(18),
    lineHeight: normalize(27),
    color: F8Colors.black,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  h3: {
    fontSize: normalize(14),
    lineHeight: normalize(18),
    color: F8Colors.lightText,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  emptyHeading: {
    fontSize: normalize(14),
    lineHeight: normalize(24),
    color: F8Colors.lightText,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  p: {
    fontSize: normalize(14),
    lineHeight: normalize(23),
    fontWeight: 'bold',
    color: 'black'  },
});
