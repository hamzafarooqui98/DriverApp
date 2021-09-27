// In App.js in a new project
import * as React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen/index';
import Chat from '../components/Chat/chat';
import Communication from '../components/Chat/Communication';

const Stack = createStackNavigator();

const HomeNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTitle: 'Chat Screen',
          headerBackTitle: () => null,
          headerRight: () => <Communication />,
          headerLeft: (props) => <HeaderBackButton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
