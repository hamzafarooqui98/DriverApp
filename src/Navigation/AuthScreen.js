import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/StartingScreens/WelcomeScreen';
import SignUpScreen from '../screens/StartingScreens/SignUpScreen';
import EnterPinScreen from '../screens/StartingScreens/EnterPinScreen';
import ResetPinScreen from '../screens/StartingScreens/ResetPinScreen';
import ResetSuccessScreen from '../screens/StartingScreens/ResetSuccessScreen';
import TermsOfUseScreen from '../screens/StartingScreens/TermsOfUseScreen';
import SuccessScreen from '../screens/StartingScreens/SuccessScreen';
import SignInScreen from '../screens/StartingScreens/SignIn';

const AuthScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterPinScreen"
        component={EnterPinScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPinScreen"
        component={ResetPinScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetSuccessScreen"
        component={ResetSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen
        name="TermsOfUseScreen"
        component={TermsOfUseScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;
