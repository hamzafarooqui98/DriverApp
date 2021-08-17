/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StartingNavigator from './src/Navigation/StartingNav';
import store from './store';
import {Provider} from 'react-redux';

navigator.geolocation = require('@react-native-community/geolocation');

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'PlaniT App Location Permission',
          message: 'PlaniT App needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{height: '100%', flexGrow: 1}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
            <StartingNavigator />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
