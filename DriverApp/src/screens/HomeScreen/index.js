import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Pressable} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';
import NewOrderPopup from '../../components/NewOrderPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const origin = {latitude: 28.450927, longitude: -16.260845};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCNFJ91ksP57SweEz_mDgDXAewlJMlr2RI';

const HomeScreen = () => {
  var available_drivers_channel = null; // this is where passengers will send a request to any available driver
  var ride_channel = null; // the channel used for communicating the current location
  // for a specific ride. Channel name is the username of the passenger

  var pusher = null; // the pusher client
  const [isOnline, setIsOnline] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  const [newOrder, setNewOrder] = React.useState({
    id: '1',
    type: 'UberX',

    originLatitude: '',
    originLongitude: '',

    destLatitude: '',
    destLongitude: '',

    user: {
      rating: 4.5,
      name: '',
    },
  });

  const onDecline = () => {
    setNewOrder(null);
  };

  const onAccept = (newOrder) => {
    setOrder(newOrder);
    // setNewOrder(null);
    console.log(order);
    setShowOrder(false);
  };

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onUserLocationChange = (event) => {
    setMyPosition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = (event) => {
    console.log('Direction found: ', event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  React.useEffect(() => {
    pusher = new Pusher('f4333a508bd2bce3771a', {
      cluster: 'ap2',
    });
    ride_channel = pusher.subscribe('my-channel');
    ride_channel.bind('my-event', (data) => {
      // alert(JSON.stringify(data));
      // console.log(data.Customer);
      // console.log(data.pickup);
      // console.log(data.destination);
      // console.log(this.state.isConnected);
      // if (!hasPassenger) {
      //   // if the driver has currently no passenger
      //   // alert the driver that they have a request
      //   alert(
      //     `You got a passenger! \n Customer: ${data.Customer} \n Pickup: ${data.OriginLatitude} \n Drop off: "${data.DestLongitude}"`
      //   );
      // }
      // setCustomer(data.Customer);
      // setDestination(data.OriginLatitude);
      // setPickupLocation(data.OriginLongitude);
      // setHasPassenger(true);
      setNewOrder((prevState) => ({
        ...prevState,
        originLatitude: data.OriginLatitude,
        originLongitude: data.OriginLongitude,
        destLatitude: data.DestLatitude,
        destLongitude: data.DestLongitude,
        user: {
          rating: 5.0,
          name: data.Customer,
        },
      }));
      setShowOrder(true);
    });
  }, []);

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#cb1a1a',
              width: 200,
              padding: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              COMPLETE {order.type}
            </Text>
          </View>
          <Text style={styles.bottomText}>{order.user.name}</Text>
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#d41212',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Dropping off {order.user.name}</Text>
        </View>
      );
    }

    if (order) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#1e9203',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order.user.name}</Text>
        </View>
      );
    }
    if (isOnline) {
      return <Text style={styles.bottomText}>You're online</Text>;
    }
    return <Text style={styles.bottomText}>You're offline</Text>;
  };

  return (
    <View>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 24.92827878065505,
          longitude: 67.1265491253068,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>
        {order && (
          <View>
            <MapViewDirections
              origin={{
                latitude: newOrder.originLatitude,
                longitude: newOrder.originLongitude,
              }}
              onReady={onDirectionFound}
              destination={{
                latitude: newOrder.destLatitude,
                longitude: newOrder.destLongitude,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="black"
            />
            <Marker
              coordinate={{
                latitude: newOrder.originLatitude,
                longitude: newOrder.originLongitude,
              }}
            />
            <Marker
              coordinate={{
                latitude: newOrder.destLatitude,
                longitude: newOrder.destLongitude,
              }}
            />
          </View>
        )}
        {/* */}
      </MapView>

      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: 'green'}}>$</Text> 0.00
        </Text>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 10, right: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 110, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 110, right: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable onPress={onGoPress} style={styles.goButton}>
        <Text style={styles.goText}>{isOnline ? 'END' : 'GO'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Ionicons name={'options'} size={30} color="#4a4a4a" />
        {renderBottomTitle()}
        <Entypo name={'menu'} size={30} color="#4a4a4a" />
      </View>

      {showOrder && (
        <NewOrderPopup
          newOrder={order}
          duration={2}
          distance={0.5}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
        />
      )}
    </View>
  );
};

export default HomeScreen;
