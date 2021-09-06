import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './Home';
import CustomDrawer from './CustomDrawer';
import TripsHistoryComponent from '../screens/NavigationScreens/TripsHistory';
import SignInScreen from '../screens/StartingScreens/SignIn';
import Colors from '../constants/Colors';
import ProfileScreen from '../screens/NavigationScreens/ProfileScreen';
import EditProfileScreen from '../screens/NavigationScreens/EditProfileScreen';
import PreBookNavigator from '../Navigation/PreBookStackNav';

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
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name={'Home' || 'RootScreen'} component={HomeNavigator} />

      <Drawer.Screen name="Your Trips" component={TripsHistoryComponent} />

      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />
      <Drawer.Screen name="Pre-Book" component={PreBookNavigator} />

      {/* <Drawer.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
      /> */}

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
