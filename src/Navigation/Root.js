import React from 'react';
import {View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './Home';
import CustomDrawer from './CustomDrawer';
import TripsHistoryComponent from '../screens/NavigationScreens/TripsHistory';
import SignInScreen from '../screens/StartingScreens/SignIn';
import Colors from '../constants/Colors';
import ProfileScreen from '../screens/NavigationScreens/ProfileScreen';
import EditProfileScreen from '../screens/NavigationScreens/EditProfileScreen';
// import PreBookNavigator from '../Navigation/PreBookStackNav';
import PreBookList from '../screens/NavigationScreens/PreBook/preBookList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();

const RootNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: 'green',
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          drawerIcon: ({color, size}) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Your Trips"
        component={TripsHistoryComponent}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Pre-Book"
        component={PreBookList}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-edit"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
