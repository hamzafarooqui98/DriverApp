import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Button,
  Modal,
  StyleSheet,
} from 'react-native';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import MapViewDirections from 'react-native-maps-directions';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';
import NewOrderPopup from '../../components/NewOrderPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import io from 'socket.io-client';
import Pusher from 'pusher-js/react-native';
import {useSelector} from 'react-redux';
import {
  setOrigin,
  setDestination,
  selectUser,
  setGuideLocation,
} from '../../slices/navSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
//import {Button} from 'react-native-elements/dist/buttons/Button';

// // Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

const origin = {latitude: 24.92826969212847, longitude: 67.12659673161777};
const destination = {latitude: 37.771707, longitude: -122.4053769};
// const GOOGLE_MAPS_APIKEY = 'AIzaSyCWeFNG8hWPUNO9JCChY_nyKDnRq6uR9gY';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCWeFNG8hWPUNO9JCChY_nyKDnRq6uR9gY';

const HomeScreen = (props) => {
  // var available_drivers_channel = null; // this is where passengers will send a request to any available driver
  // var ride_channel = null; // the channel used for communicating the current location
  // // for a specific ride. Channel name is the username of the passenger

  // var pusher = null; // the pusher client
  const [isOnline, setIsOnline] = useState(false);
  const [orderArrived, setOrderArrived] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const [val, setVal] = useState(false);
  // const [currentRegion, setCurrentRegion] = useState({
  //   latitude: 30.3753,
  //   longitude: 69.3451,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });
  // const [showOrder, setShowOrder] = useState(false);
  const userInformation = useSelector(selectUser);
  const [newOrder, setNewOrder] = useState({
    // id: '1',
    // type: 'UberX',
    // originLatitude: 24.915003728618323,
    // originLongitude: 67.12725490091005,
    // destLatitude: 24.93257509249255,
    // destLongitude: 67.12723446534324,
    // user: {
    //   rating: 4.5,
    //   name: 'Hamza',
    // },
    // id: '1',
    // type: 'UberX',
    // orgin: '',
    // destination: '',
    // originLatitude: '',
    // originLongitude: '',
    // destLatitude: '',
    // destLongitude: '',
    // user: {
    //   rating: 4.5,
    //   name: '',
    //   phone: '',
    // },
  });

  // Geolocation.getCurrentPosition((info) =>
  //   setCurrentRegion({
  //     ...currentRegion,
  //     latitude: info.coords.latitude,
  //     longitude: info.coords.longitude,
  //   }),
  // );

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onLocationChange = (event) => {
    setMyPosition({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    val
      ? setTimeout(() => {
          //setMyPosition(null);
          socket.emit('guide Location', myPosition);
        }, 5000)
      : {};
  };

  const confirmBooking = async () => {
    socket.emit('guide details', userInformation);
    console.log(myPosition);
    socket.emit('guide Location', myPosition);
  };

  const onDecline = () => {
    setNewOrder(null);
  };

  const onAccept = (nOrder) => {
    //console.log('Han bhai', nOrder);
    setOrder(nOrder);
    setNewOrder(null);
    confirmBooking();
    setVal(true);

    // console.log('Purana wala order:', order);
    // console.log('NEW ORDER', newOrder);
    // setShowOrder(false);
  };

  const onDirectionFound = (event) => {
    // console.log(event);
    // console.log('DIRECTIONS BAAD WALA ORDER:', order);
    // console.log('NEW ORDER:', newOrder);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
    mapRef.current.fitToCoordinates(event.coordinates, {
      edgePadding: {
        right: 15,
        bottom: 100,
        left: 15,
        top: 100,
      },
    });
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

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        console.log(value);
        console.log('Helloo');
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    console.log('Hello');
    console.log(userInformation);
    console.log(myPosition);
    socket = io('https://planit-fyp.herokuapp.com');
    socket.on('order details', (order) => {
      rejectBooking(order.data._id);
      console.log(myPosition);
    });
    getData();
    console.log('Helloo');
    //   pusher = new Pusher('f4333a508bd2bce3771a', {
    //     cluster: 'ap2',
    //   });
    //   ride_channel = pusher.subscribe('my-channel');
    //   ride_channel.bind('my-event', (data) => {
    //     // alert(JSON.stringify(data));
    //     // console.log(data.Customer);
    //     // console.log(data.pickup);
    //     // console.log(data.destination);
    //     // console.log(this.state.isConnected);
    //     // if (!hasPassenger) {
    //     //   // if the driver has currently no passenger
    //     //   // alert the driver that they have a request
    //     //   alert(
    //     //     `You got a passenger! \n Customer: ${data.Customer} \n Pickup: ${data.OriginLatitude} \n Drop off: "${data.DestLongitude}"`
    //     //   );
    //     // }
    //     // setCustomer(data.Customer);
    //     // setDestination(data.OriginLatitude);
    //     // setPickupLocation(data.OriginLongitude);
    //     // setHasPassenger(true);
    //     setNewOrder((prevState) => ({
    //       ...prevState,
    //       originLatitude: data.OriginLatitude,
    //       originLongitude: data.OriginLongitude,
    //       destLatitude: data.DestLatitude,
    //       destLongitude: data.DestLongitude,
    //       user: {
    //         rating: 5.0,
    //         name: data.Customer,
    //       },
    //     }));
    //     setShowOrder(true);
    //   });
  }, []);

  const pickupUser = () => {
    const guidePosition = null;
    socket.emit('final Position', guidePosition);
    setVal(false);
  };

  const rejectBooking = async (orderId) => {
    // setReject(true);
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/${orderId}`,
    );
    const response = await res.json();
    console.log(response);
    setName(response.order.name);
    setPhone(response.order.phone);
    setOrigin(response.order.origin);
    setDestination(response.order.destination);
    setModalVisible(true);
    setNewOrder({
      id: '1',
      type: 'UberX',
      cost: response.order.cost,
      // duration: response.order.duration,
      origin: response.order.origin,
      destination: response.order.destination,
      originLatitude: Number(response.order.originlatitude),
      originLongitude: Number(response.order.originLongitude),
      destLatitude: Number(response.order.destLatitude),
      destLongitude: Number(response.order.destLongitude),
      user: {
        rating: 5.0,
        name: response.order.name,
        phone: response.order.phone,
      },
    });
    // alert(
    //   `Customer:${response.order.name},Phone:${response.order.phone},Origin:${response.order.origin},Destination:${response.order.destination}`,
    // );
    // socket.emit("order", response);
  };

  const mapRef = useRef();

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#53A979',
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
    <View style={{backgroundColor: 'white'}}>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onLocationChange}
        initialRegion={{
          latitude: 30.3753,
          longitude: 69.3451,
          latitudeDelta: 10.500022,
          longitudeDelta: 10.5000421,
        }}
        ref={mapRef}>
        {order && (
          // <View>
          <MapViewDirections
            origin={myPosition}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#53A979"
          />
        )}
        {order && !order.pickedUp && (
          <Marker
            coordinate={{
              latitude: order.originLatitude,
              longitude: order.originLongitude,
            }}
          />
        )}
        {order && order.pickedUp && (
          <Marker
            coordinate={{
              latitude: order.destLatitude,
              longitude: order.destLongitude,
            }}
          />
        )}
      </MapView>

      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: 'green'}}>Rs.</Text> 0.00
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          props.navigation.toggleDrawer();
          console.log('Hello drawer');
        }}
        style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      {/* <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 10, right: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 110, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable> */}

      {/* {orderArrived ? <Button title="Accept Ride" onPress={}/> :  null} */}

      <Pressable
        onPress={() => {
          pickupUser();
        }}
        style={styles.goButton}>
        <Text style={styles.goText}>{isOnline ? 'END' : 'GO'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Ionicons name={'options'} size={30} color="#4a4a4a" />
        {renderBottomTitle()}
        <Pressable onPress={() => props.navigation.navigate('Chat')}>
          <Entypo name={'chat'} size={24} color="#4a4a4a" />
        </Pressable>
        {/* <Entypo name={'menu'} size={30} color="#4a4a4a" /> */}
        {/* <Pressable
        onPress={() => props.navigation.navigate('Chat')}
        style={[styles.roundButton, {bottom: 110, right: 10}]}>
        <Entypo name={'chat'} size={24} color="#4a4a4a" />
      </Pressable> */}
      </View>
      {/* 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name: {name}</Text>
            <Text style={styles.modalText}>Phone: {phone}</Text>
            <Text style={styles.modalText}>Pickup: {origin}</Text>
            <Text style={styles.modalText}>Destination: {destination}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                confirmBooking();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Accept Trip</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Reject Trip</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}

      {newOrder?.id && (
        <NewOrderPopup
          newOrder={newOrder}
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
