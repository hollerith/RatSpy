import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';

import Constants from 'expo-constants';

import styles from './styles';

class Login extends React.Component {

  state = { streamName: Constants.deviceName ? Constants.deviceName : 'Unknown-marvin' };

  logState = (title) => {
	  console.log(`         Login :: ${title}`);
	  console.log(`    streamName :: ${this.state.streamName}`);
	}

  onPressLogin = () => {
    const { streamName } = this.state;
    if (streamName === '') return Alert.alert('Please input streamName');

    const {
      navigation: { navigate },
    } = this.props;
    return navigate('Viewer', { streamName });
  };

  onChangeName = (streamName) => this.setState({ streamName });

  render() {
    const { streamName } = this.state;
		this.logState('before render');

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter a stream name"
          placeholderTextColor="gray"
          value={streamName}
          onChangeText={this.onChangeName}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.loginBtn} onPress={this.onPressLogin}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Login;
