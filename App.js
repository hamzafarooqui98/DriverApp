/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store';
import {Provider} from 'react-redux';

import WelcomeScreen from './src/screens/StartingScreens/WelcomeScreen';
import SignUpScreen from './src/screens/StartingScreens/SignUpScreen';
import EnterPinScreen from './src/screens/StartingScreens/EnterPinScreen';
import ResetPinScreen from './src/screens/StartingScreens/ResetPinScreen';
import ResetSuccessScreen from './src/screens/StartingScreens/ResetSuccessScreen';
import SuccessScreen from './src/screens/StartingScreens/SuccessScreen';
import TermsOfUseScreen from './src/screens/StartingScreens/TermsOfUseScreen';
import RootNavigator from './src/Navigation/Root';
import SignInScreen from './src/screens/StartingScreens/SignIn';
import {AuthContext} from './src/components/Context';

navigator.geolocation = require('@react-native-community/geolocation');

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [token, setToken] = useState('');

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setToken(token);
    },
    signOut: () => {
      setToken(null);
    },
    signUp: () => {
      setToken(token);
    },
  }));

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

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        const val = JSON.parse(value);
        console.log(val);
        setToken(val.token);
        // console.log(val.name);
        // console.log(val);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    setToken(token);
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
    getData();
  }, []);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {/* <StatusBar barStyle="dark-content" /> */}
          <SafeAreaView style={{height: '100%', flexGrow: 1}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
              {/* {token !== null ? ( */}
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen
                  name="WelcomeScreen"
                  component={WelcomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="SignInScreen" component={SignInScreen} />

                <Stack.Screen
                  name="EnterPinScreen"
                  component={EnterPinScreen}
                />

                <Stack.Screen
                  name="ResetPinScreen"
                  component={ResetPinScreen}
                />

                <Stack.Screen
                  name="ResetSuccessScreen"
                  component={ResetSuccessScreen}
                />

                <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
                <Stack.Screen
                  name="TermsOfUseScreen"
                  component={TermsOfUseScreen}
                  options={{title: 'Terms of Use'}}
                />
                <Stack.Screen
                  name="RootScreen"
                  component={RootNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
                {/* ) : ( */}
              </Stack.Navigator>
              {/* )} */}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
