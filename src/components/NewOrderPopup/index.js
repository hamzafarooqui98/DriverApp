import React from 'react';
import {View, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles.js';

const NewOrderPopup = ({
  orderType,
  newOrder,
  onAccept,
  onDecline,
  duration,
  distance,
}) => {
  return (
    <View style={styles.root}>
      <Pressable onPress={onDecline} style={styles.declineButton}>
        <Text style={styles.declineText}>Decline</Text>
      </Pressable>

      <Pressable onPress={onAccept} style={styles.popupContainer}>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 10,
            color: 'blue',
            fontWeight: 'bold',
          }}>
          {orderType}
        </Text>
        <Text style={styles.uberType}>{newOrder?.type}</Text>

        <View style={styles.row}>
          <View style={styles.places}>
            <Text style={[styles.text, {color: 'blue'}]}>Origin :</Text>
            <Text style={[styles.text, {color: 'lightgrey'}]}>
              {newOrder?.origin.split(',')[0]}
            </Text>
          </View>

          <View style={styles.userBg}>
            <FontAwesome name={'user'} color={'white'} size={35} />
          </View>

          <View style={styles.places}>
            <Text style={[styles.text, {color: 'blue'}]}>Destination :</Text>
            <Text style={[styles.text, {color: 'lightgrey'}]}>
              {newOrder?.destination.split(',')[0]}
            </Text>
          </View>
        </View>

        <Text style={styles.minutes}>{duration}</Text>
        <Text style={styles.distance}>{distance.split(' ')[0]} miles</Text>
      </Pressable>
    </View>
  );
};

export default NewOrderPopup;
