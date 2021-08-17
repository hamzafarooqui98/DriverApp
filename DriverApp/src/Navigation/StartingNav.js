import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/StartingScreens/WelcomeScreen';
import SignUpScreen from '../screens/StartingScreens/SignUpScreen';
import EnterPinScreen from '../screens/StartingScreens/EnterPinScreen';
import ResetPinScreen from '../screens/StartingScreens/ResetPinScreen';
import ResetSuccessScreen from '../screens/StartingScreens/ResetSuccessScreen';
import SuccessScreen from '../screens/StartingScreens/SuccessScreen';
import TermsOfUseScreen from '../screens/StartingScreens/TermsOfUseScreen';
import RootNavigator from './Root';

const Stack = createStackNavigator();

const StartingNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

      <Stack.Screen name="EnterPinScreen" component={EnterPinScreen} />

      <Stack.Screen name="ResetPinScreen" component={ResetPinScreen} />

      <Stack.Screen name="ResetSuccessScreen" component={ResetSuccessScreen} />

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
    </Stack.Navigator>
  );
};

export default StartingNavigator;
