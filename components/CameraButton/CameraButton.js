// Button
'use strict';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Button = props => {
  return (
    <TouchableOpacity
      style={ styles.button }
      onPress={ props.onPress }>

      <FontAwesome
          name={ props.icon }
          style={ props.style || styles.icon }
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    color: "#fff", 
    fontSize: 40
  },
});

export default Button;
