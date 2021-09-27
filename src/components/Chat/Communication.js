import React from 'react';

import {View, Linking} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import {selectClientDetails} from '../../slices/navSlice';
import {useSelector} from 'react-redux';

const Communication = () => {
  const clientInformation = useSelector(selectClientDetails);
  const dialCall = () => {
    let phoneNumber = clientInformation.phone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const whatsappCall = () => {
    let phoneNumber = clientInformation.phone;
    let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 20,
      }}>
      <TouchableOpacity onPress={dialCall}>
        <FontAwesome
          name="phone"
          size={30}
          color={Colors.secondary}
          style={{padding: 10}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={whatsappCall}>
        <FontAwesome name="whatsapp" size={30} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Communication;
