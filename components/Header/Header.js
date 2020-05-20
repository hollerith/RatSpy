// Header
'use strict';
import React from 'react';
import {Text, ImageBackground} from 'react-native';
import styles from './styles';

const Header = props => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('./logo.png')}
    style={styles.background}
    imageStyle={styles.logo}>
    <Text style={styles.text}>{ props.title }</Text>
  </ImageBackground>
);

export default Header;
