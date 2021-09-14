import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Button,
  Modal,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
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
  setUser,
  selectPreBookOrder,
} from '../../slices/navSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import ModalPopUp from './modal.js';
import Colors from '../../constants/Colors.js';
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
  const [guideName, setGuideName] = useState('');
  const [guideId, setGuideId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const [val, setVal] = useState(false);
  const [cost, setCost] = useState('0.00');
  const [guideCost, setGuideCost] = useState('0.00');
  const [balance, setBalance] = useState('0.00');
  //const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [emit, setEmit] = React.useState(false);
  const [number, onChangeNumber] = useState(null);
  const [card, setCard] = React.useState(false);
  const [showCash, setShowCash] = React.useState(false);
  const [showCard, setShowCard] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = React.useState(true);
  const [category, setCategory] = useState('');
  const [orderId, setOrderId] = useState('');
  const [userDuration, setUserDuration] = useState('1');
  // const [currentRegion, setCurrentRegion] = useState({
  //   latitude: 30.3753,
  //   longitude: 69.3451,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });
  // const [showOrder, setShowOrder] = useState(false);
  const userInformation = useSelector(selectUser);
  const preBookInformation = useSelector(selectPreBookOrder);
  const [newOrder, setNewOrder] = useState({});

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
    // val
    //   ? setTimeout(() => {
    //       //setMyPosition(null);
    //       socket.emit('guide Location', myPosition);
    //     }, 5000)
    //   : {};
  };

  const confirmBooking = async () => {
    socket.emit('guide details', userInformation);
    console.log(myPosition);
    socket.emit('guide Location', myPosition);
    setGuideCost(cost);
  };

  const onDecline = () => {
    setNewOrder(null);
  };

  const handleEditOrder = async (id) => {
    //   setVal(true);

    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/updateOrder/${id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guideName,
          guideId,
        }),
      },
    );
    const response = await res.json();
    console.log(response);
    // if (response) navigation.navigate("PreBookDateNTime");
    // if (response) alert("Order updated");
    // socket.emit("order details", response);
    // socket.emit("order details", {
    //   Name: response.data.name,
    //   Phone: response.data.phone,
    //   Origin: response.data.origin,
    //   Destination: response.data.destination,
    //   OriginLatitude: response.data.originlatitude,
    //   OriginLongitude: response.data.originLongitude,
    //   DestLatitude: response.data.destLatitude,
    //   DestLongitude: response.data.destLongitude,
    // });
  };

  const onAccept = (nOrder) => {
    //console.log('Han bhai', nOrder);
    if (category == 'Live') setOrder(nOrder);
    //setOrder(nOrder);
    setNewOrder(null);
    handleEditOrder(orderId);
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
        pickedUp: order.pickedUp || event.distance < 0.8,
        isFinished: order.pickedUp && event.distance < 0.8,
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
      const obj = JSON.parse(value);
      if (value !== null) {
        // value previously stored
        setGuideName(obj.name);
        setGuideId(obj.id);
        dispatch(
          setUser({
            name: obj.name,
            phone: obj.phone,
            token: obj.token,
            email: obj.email,
            id: obj.id,
            city: obj.city,
            country: obj.country,
            avatar: obj.avatar,
          }),
        );
        console.log(obj);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    //  console.log('Hello worlds');
    console.log('Hwelllo');
    //console.log(preOrder);
    //console.log('Hello');
    console.log(preBookInformation);
    if (preBookInformation) {
      setOrder(preBookInformation);
    }
    // console.log('Hello world');
    // console.log('Python');
    // console.log(userInformation);
    console.log(myPosition);
    socket = io('https://planit-fyp.herokuapp.com');

    socket.on('order details', (order) => {
      rejectBooking(order.data._id);
      setOrderId(order.data._id);
      console.log(myPosition);
    });

    console.log('Helloo');

    socket.on('payment method', (payment) => {
      // setCard(false);
      // setShowCard(true);
      // setCard(true);
      // setCard(true);
      setShowModal(true);
      setCard(true);
    });

    socket.on('payment card', (payment) => {
      setShowModal(true);
      setEmit(true);
      // setEmit(false);
      // setShowCash(true);
      // setEmit(true);
      //setEmit(true);
    });
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
  }, [preBookInformation]);

  const pickupUser = () => {
    const guidePosition = null;
    socket.emit('final Position', guidePosition);
    setVal(false);
    setIsOnline(!isOnline);
  };

  const close = () => {
    setShowModal(!showModal);
    setEmit(false);
    setCard(false);
    setOrder(null);
    setCost('0.00');
    setGuideCost('0.00');
  };

  const tripComplete = () => {
    setVisible(true);
    // setEmit(false);
    // setCard(false);

    socket.emit('trip completed', show);
  };

  const rejectBooking = async (orderId) => {
    // setReject(true);
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/${orderId}`,
    );
    const response = await res.json();
    console.log(response);
    console.log(typeof response.order.cost.split('R')[1]);
    response.order.category == 'Live'
      ? setBalance(response.order.cost.split('R')[1])
      : null;
    response.order.category == 'Live' ? setCost(response.order.cost) : null;
    setName(response.order.name);
    setPhone(response.order.phone);
    setOrigin(response.order.origin);
    setDestination(response.order.destination);
    setCategory(response.order.category);
    setUserDuration(response.order.duration);
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
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#53A979',
              width: 200,
              padding: 10,
            }}
            onPress={() => {
              tripComplete();
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Complete {order.type}
            </Text>
          </Pressable>
          <Text style={styles.bottomText}>{order.user.name}</Text>
          <ModalPopUp visible={visible}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require('../../assets/x.png')}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/success.png')}
                style={{height: 150, width: 150, marginVertical: 10}}
              />
            </View>

            <Text
              style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
              Congratulations Trip was successful
            </Text>
          </ModalPopUp>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              close();
            }}>
            {emit && (
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image
                    source={require('../../assets/planiTMainLogo.png')}
                    style={{width: 100, height: 100, borderRadius: 25, top: 0}}
                  />
                  <Text
                    style={[
                      styles.modalText,
                      {
                        fontWeight: 'bold',
                        fontSize: 22,
                      },
                    ]}>
                    Transaction
                  </Text>
                  <Text style={styles.modalText}>Fare : {cost}</Text>
                  <Text style={{textAlign: 'center', fontSize: 15}}>
                    Cash Recieved:
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      marginBottom: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.primary,
                      padding: 10,
                    }}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Amount"
                    keyboardType="numeric"
                  />
                  <Text style={styles.modalText}>
                    Balance :{' '}
                    <Text style={{fontWeight: 'bold'}}>
                      {number
                        ? (number - Math.round(balance)).toString()
                        : '0.00'}
                    </Text>
                  </Text>
                  <Pressable
                    style={[styles.modalButton, styles.buttonClose]}
                    onPress={() => close()}>
                    <Text style={styles.textStyle}>Accept</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {card && (
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image
                    source={require('../../assets/planiTMainLogo.png')}
                    style={{width: 100, height: 100, borderRadius: 25, top: 0}}
                  />
                  <Text
                    style={[
                      styles.modalText,
                      {
                        fontWeight: 'bold',
                        fontSize: 22,
                      },
                    ]}>
                    Transaction
                  </Text>
                  <Text style={styles.modalText}>
                    Amount recieved through card Successfully
                  </Text>
                  <Pressable
                    style={[styles.modalButton, styles.buttonClose]}
                    onPress={() => close()}>
                    <Text style={styles.textStyle}>Done</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Modal>
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
          <Text style={{color: 'green'}}></Text>
          {guideCost}
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
        <Pressable
          onPress={() => {
            tripComplete();
          }}>
          <Ionicons name={'options'} size={30} color="#4a4a4a" />
        </Pressable>
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
        {/* <ModalPopUp visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  source={require('../../assets/x.png')}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/success.png')}
              style={{height: 150, width: 150, marginVertical: 10}}
            />
          </View>

          <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
            Congratulations registration was successful
          </Text>
        </ModalPopUp>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            close();
          }}>
          {emit && (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={require('../../assets/planiTMainLogo.png')}
                  style={{width: 100, height: 100, borderRadius: 25, top: 0}}
                />
                <Text
                  style={[
                    styles.modalText,
                    {
                      fontWeight: 'bold',
                      fontSize: 22,
                    },
                  ]}>
                  Transaction
                </Text>
                <Text style={styles.modalText}>Fare : {cost}</Text>
                <Text style={{textAlign: 'center', fontSize: 15}}>
                  Cash Recieved:
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    marginBottom: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.primary,
                    padding: 10,
                  }}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
                <Text style={styles.modalText}>
                  Balance :{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {number
                      ? (number - Math.round(balance)).toString()
                      : '0.00'}
                  </Text>
                </Text>
                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => close()}>
                  <Text style={styles.textStyle}>Accept</Text>
                </Pressable>
              </View>
            </View>
          )}
          {card && (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={require('../../assets/planiTMainLogo.png')}
                  style={{width: 100, height: 100, borderRadius: 25, top: 0}}
                />
                <Text
                  style={[
                    styles.modalText,
                    {
                      fontWeight: 'bold',
                      fontSize: 22,
                    },
                  ]}>
                  Transaction
                </Text>
                <Text style={styles.modalText}>
                  Amount recieved through card Successfully
                </Text>
                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => close()}>
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Modal> */}
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={card}
          onRequestClose={() => {
            setCard(!card);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={require('../../assets/planiTMainLogo.png')}
                style={{width: 100, height: 100, borderRadius: 25, top: 0}}
              />
              <Text
                style={[
                  styles.modalText,
                  {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                ]}>
                Transaction
              </Text>
              <Text style={styles.modalText}>
                Amount recieved through card Successfully
              </Text>
              <Pressable
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => setCard(!card)}>
                <Text style={styles.textStyle}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal> */}
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
          duration={userDuration}
          distance={0.5}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
        />
      )}
    </View>
  );
};

export default HomeScreen;
