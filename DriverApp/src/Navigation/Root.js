import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './Home';
import CustomDrawer from './CustomDrawer';
import ProfileStackNavigator from './ProfileStackNav';
import TripsHistoryComponent from '../screens/NavigationScreens/TripsHistory';

const Drawer = createDrawerNavigator();

const DummyScreen = (props) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>
);

const RootNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeNavigator} />

      <Drawer.Screen name="Your Trips" component={TripsHistoryComponent} />

      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />

      <Drawer.Screen name="Wallet">
        {() => <DummyScreen name={'Wallet'} />}
      </Drawer.Screen>

      <Drawer.Screen name="Settings">
        {() => <DummyScreen name={'Settings'} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default RootNavigator;
