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
import {AuthContext} from '../components/Context';

const Stack = createStackNavigator();

const StartingNavigator = (props) => {
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken('ham');
    },
    signOut: () => {
      setUserToken(null);
    },
    signUp: () => {
      setUserToken('ham');
    },
  }));

  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    setToken(props.token);
  }, []);
  return token ? (
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
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
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
