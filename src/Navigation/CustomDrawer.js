import React, {useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../components/Context';
import Colors from '../constants/Colors';
import {setOrigin, setDestination, selectUser} from '../slices/navSlice';
import {useSelector} from 'react-redux';

const CustomDrawer = (props) => {
  const [name, setName] = useState('');
  const {signOut} = React.useContext(AuthContext);
  const userInformation = useSelector(selectUser);

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        const val = JSON.parse(value);
        setName(val.name);
        // console.log(val.name);
        // console.log(val);
      }
    } catch (e) {
      // error reading value
    }
  };

  const logOut = async () => {
    removeData();
    // signOut();
    // props.navigation.navigate('SignInScreen');
  };

  useEffect(() => {
    getData();
  });
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: Colors.primary, padding: 15}}>
        {/* User Row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />

          <View>
            <Text style={{color: 'white', fontSize: 24}}>
              {userInformation.name}
            </Text>
            <Text style={{color: 'white'}}>5.00 *</Text>
          </View>
        </View>

        {/* Messages Row */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'white',
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <Pressable
            onPress={() => {
              console.warn('Messages');
            }}>
            <Text style={{color: 'white', paddingVertical: 5}}>Messages</Text>
          </Pressable>
        </View>

        {/* Do more */}
        <Pressable
          onPress={() => {
            console.warn('Make Money Driving');
          }}>
          <Text style={{color: 'white', paddingVertical: 5}}>
            Do more with your account
          </Text>
        </Pressable>

        {/* Make money */}
        <Pressable
          onPress={() => {
            console.warn('Make Money Driving');
          }}>
          <Text style={{color: 'white', paddingVertical: 5}}>
            Make money while Guiding
          </Text>
        </Pressable>
      </View>

      <DrawerItemList {...props} />

      {/* Make money */}
      <Pressable onPress={logOut}>
        <Text style={{padding: 5, paddingLeft: 20}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
