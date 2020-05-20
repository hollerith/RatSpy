import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Details from '../Details'
import styles from './styles'

function Home({ navigation }) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.welcomeText }> Welcome </Text>

      <TouchableOpacity 
        style={ styles.detailsBtn }
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }}>
        <Text style={styles.textButton}> Details </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ styles.detailsBtn }
        onPress={() => {
          navigation.navigate('Viewer', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }}>
        <Text style={styles.textButton}> Viewer </Text>
      </TouchableOpacity>

    </View>
  );
}

export default Home;
