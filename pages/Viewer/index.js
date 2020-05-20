/**
 * RatSpy - serve rtsp stream
 * https://github.com/hollerith/react-native-boiler
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
	Alert,
} from 'react-native';

import Header from '../../components/Header';
import CameraButton from '../../components/CameraButton';
import { videoConfig, audioConfig } from '../../utils/constants';

import { NodeCameraView } from 'react-native-nodemediaclient';
import NetInfo from "@react-native-community/netinfo";

import styles from './styles.js';
import { RTMP_SERVER } from './config.js'

interface State {   
  hasPermission: boolean;
  hasFlash: boolean;
  isPublish: boolean;
  streamName: string;
}

const Viewer = ({ route, navigation }) => {

  var camera;
  const title = "RatSpy - rtsp feed"

  const { streamName } = route.params

  const logState = (title) => {
    console.log(`        Viewer :: ${title}`);
    console.log(` hasPermission :: ${state.hasPermission}`);
    console.log(`     isPublish :: ${state.isPublish}`);
    console.log(`      hasFlash :: ${state.hasFlash}`);
    console.log(`    streamName :: ${state.streamName}`);
    console.log(`     outputUrl :: ${outputUrl}`);
  }

  const [state, setState] = useState<State>({  
    hasPermission: false,
    isPublish: false,
    hasFlash: false,
    streamName: "liveuser",
  });

  useEffect(() => {
    (async () => {
      NetInfo.fetch().then(netInfoState => {
        if (!netInfoState.isConnected) {
          Alert.alert('Please check your network connection');
        }
      });

      const status = await requestPermissionsAsync();

      setState({ ...state, 'hasPermission' : status, 'streamName' : streamName });
    })();
  }, []);

  const requestPermissionsAsync = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
      );

      if (granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera and record audio");
        return true
      } else {
        console.log(`${JSON.stringify(granted)} =/= ${PermissionsAndroid.RESULTS.GRANTED} (Camera permission denied)`);
      }
    } catch (err) {
      console.warn(err);
    }
    return false
  };

  const togglePublish = () => {
    if (state.isPublish) {
      camera.stop();
      setState({ ...state, isPublish: false });
    } else {
      camera.start();
      setState({ ...state, isPublish: true });
    }
    logState('togglePublish')
  }

  const toggleFlash = () => {
    logState('enabling Flash')
    camera.flashEnable(state.hasFlash)
    setState({ ...state, hasFlash: !state.hasFlash });
  } 

  const toggleCamera = () => {
    logState('switching Front')
    camera.switchCamera()
  } 

  const outputUrl = `rtmp://${ RTMP_SERVER }/stream/${ state.streamName }`;

  logState('Before return')

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={ styles.body }>

        <NodeCameraView 
          style={{ flex: 1 }}
          ref={(vb) => { camera = vb }}
          outputUrl={ outputUrl }
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={ audioConfig } 
          video={ videoConfig }
          autopreview={true}
          />

        <View style={ styles.camera }>
          <CameraButton 
            onPress={  requestPermissionsAsync }
            icon="lock"
            style={ !state.hasPermission ? styles.Red : styles.White }
          />
          <CameraButton
            onPress={ togglePublish }
            icon="video-camera"
            style={ state.isPublish ? styles.Red : styles.White }
          />
          <CameraButton 
            onPress={ toggleCamera }
            icon="repeat"
            style={ state.hasFlash ? styles.White : styles.Orange }
          />
        </View> 
      </View>
    </>
  );
};

export default Viewer;
