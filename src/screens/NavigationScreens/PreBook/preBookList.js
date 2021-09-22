import React, {useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

import preBook from './preBook';
import Entypo from 'react-native-vector-icons/Entypo';
import io from 'socket.io-client';
import {
  selectUser,
  setPreBookOrder,
  selectPreBookOrder,
} from '../../../slices/navSlice';
import {useDispatch, useSelector} from 'react-redux';
//import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../constants/Colors';
import profile from '../../../assets/taimoor.jpg';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');
const SPACING = 12;
const ITEM_HEIGHT = height * 0.25;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + 70 * 3;

const PreBookList = ({navigation}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [data, setData] = React.useState([]);
  const userInformation = useSelector(selectUser);
  const [isFetching, setIsFetching] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [orderId, setOrderId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const preBookInformation = useSelector(selectPreBookOrder);
  const [preBookDetails, setPreBookDetails] = useState();
  const [guidePhone, setGuidePhone] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const getData = async (id) => {
    // value previously stored
    // console.log(value);
    //const val = JSON.parse(value);
    //const userId = val.id;
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/getGuidePreBookOrders/${id}`,
    );
    const response = await res.json();
    // console.log(response);
    // console.log(response.data);
    // const orders = response.data.map((x) => x);
    // console.log(orders);
    const orders = response.userOrders.map((x) => {
      return {
        key: x._id,
        image: x.userAvatar,
        name: x.name,
        phone: x.phone,
        date: x.date,
        time: x.time,
        guideName: x.guideName,
        origin: x.origin,
        destination: x.destination,
      };
    });
    //console.log(orders);
    setData(orders);
  };

  React.useEffect(() => {
    console.log('Heloo world');
    setGuidePhone(userInformation.phone);
    socket = io('https://planit-fyp.herokuapp.com');
    setTimeout(() => {
      //setMyPosition(null);
      getData(userInformation.id);
      setIsFetching(false);
    }, 3000);
  }, [isFocused]);

  const rejectBooking = async (id) => {
    // setReject(true);
    console.log(id);
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/${id}`,
    );
    const response = await res.json();
    console.log(response);
    console.log(id);
    setPreBookDetails(response);
    socket.emit('pre book', response);
    socket.emit('guide Phone', guidePhone);

    dispatch(
      setPreBookOrder({
        ...preBookInformation,
        type: 'UberX',
        cost: response.order.cost,
        // duration: response.order.duration,
        balance: response.order.cost.split('R')[1],
        id: response.order._id,
        name: response.order.name,
        phone: response.order.phone,
        userDuration: response.order.duration,
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
      }),
    );
    // alert(
    //   `Customer:${response.order.name},Phone:${response.order.phone},Origin:${response.order.origin},Destination:${response.order.destination}`,
    // );
    // socket.emit("order", response);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isFetching ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
          color="green"
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/MainLogoPlaniT.png')}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
            blurRadius={3}
          />
          <Animated.FlatList
            data={data}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{
              padding: SPACING,
              paddingTop: StatusBar.currentHeight || 42,
            }}
            renderItem={({item, index}) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];
              const opacityInputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 1),
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0],
              });
              return (
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('PreBookListDetails', {item});
                    setShowModal(true);
                    setDestination(item.destination);
                    setOrigin(item.origin);
                    setOrderId(item.key);
                    setDate(item.date);
                    setTime(item.time);
                  }}
                  style={{width: '90%'}}>
                  <Animated.View
                    style={{
                      flexDirection: 'row',
                      padding: SPACING,
                      marginBottom: SPACING,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      borderRadius: 12,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 20,
                      opacity,
                      transform: [{scale}],
                    }}>
                    <Image
                      source={{uri: userInformation.avatar}}
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        marginRight: SPACING / 2,
                      }}
                    />
                    <View style={{flexShrink: 1}}>
                      <Text style={{fontSize: 22, fontWeight: '700'}}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          opacity: 0.7,
                          color: 'black',
                          flexWrap: 'wrap',
                        }}>
                        <Text style={{color: 'green', fontWeight: 'bold'}}>
                          Origin:{' '}
                        </Text>
                        {item.origin}
                      </Text>
                      {/* 
                      <Text
                        style={{
                          fontSize: 14,
                          opacity: 0.7,
                          color: 'black',
                          flexWrap: 'wrap',
                        }}>
                        <Text style={{color: 'green', fontWeight: 'bold'}}>
                          Destination:{' '}
                        </Text>
                        {item.destination}
                      </Text> */}
                      <Text
                        style={{
                          fontSize: 14,
                          opacity: 0.7,
                          color: 'black',
                          flexWrap: 'wrap',
                        }}>
                        <Text style={{color: 'green', fontWeight: 'bold'}}>
                          Date:{' '}
                        </Text>
                        {item.date}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          opacity: 0.7,
                          color: 'black',
                          flexWrap: 'wrap',
                        }}>
                        <Text style={{color: 'green', fontWeight: 'bold'}}>
                          Time:{' '}
                        </Text>
                        {item.time}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />
          {/* <SharedElement id="general.bg"> */}
          {/* <View style={styles.bg} /> */}
          {/* </SharedElement> */}
        </View>
      )}
      <Pressable
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 25,
          top: 10,
          left: 10,
        }}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      {/* Modal */}
      {showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Image
                    source={require('../../../assets/x.png')}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
              <Image
                source={require('../../../assets/planiTMainLogo.png')}
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
                Details
              </Text>
              <Text style={styles.modalText}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>Date: </Text>
                {date}
              </Text>
              <Text style={styles.modalText}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>Time: </Text>
                {time}
              </Text>
              <Text style={styles.modalText}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                  Origin:{' '}
                </Text>
                {origin}
              </Text>
              <Text style={styles.modalText}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                  Destination:{' '}
                </Text>
                {destination}
              </Text>
              <Pressable
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => {
                  rejectBooking(orderId);
                  // socket.emit('pre book', preBookDetails);
                  // socket.emit('guide Phone', guidePhone);
                  setShowModal(false);
                  navigation.navigate('RootScreen', {
                    screen: 'Home',
                    params: {
                      screen: 'Home',
                    },
                  });
                }}>
                <Text style={styles.textStyle}>Start</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PreBookList;

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    fontSize: 18,
    position: 'absolute',
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 18 * 1.3,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: 'contain',
    // position: 'absolute',
    bottom: 0,
    right: SPACING,
  },
  bg: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'white',
    transform: [{translateY: height}],
    borderRadius: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    paddingTop: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
  },
  buttonClose: {
    backgroundColor: Colors.primary,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeader: {
    width: 30,
    height: 30,
    // alignItems: 'flex-end',
    // justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
