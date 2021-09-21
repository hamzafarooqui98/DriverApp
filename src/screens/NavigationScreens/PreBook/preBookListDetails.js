import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import Colors from '../../../constants/Colors';

import {detailsIcons} from './preBook';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {selectPreBookOrder, setPreBookOrder} from '../../../slices/navSlice';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';

const DURATION = 400;
const {width, height} = Dimensions.get('screen');
const SPACING = 10;
const ITEM_HEIGHT = height * 0.18;
const TOP_HEADER_HEIGHT = height * 0.3;

const PreBookListDetails = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
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
  const [userDuration, setUserDuration] = useState('1');
  const [newOrder, setNewOrder] = useState({});
  const preBookInformation = useSelector(selectPreBookOrder);
  const [preBookDetails, setPreBookDetails] = useState();
  const [id, setId] = useState('');
  const isFocused = useIsFocused();

  const rejectBooking = async (orderId) => {
    // setReject(true);
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/${orderId}`,
    );
    const response = await res.json();
    console.log(response);
    console.log(orderId);
    setPreBookDetails(response);

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

  const press = () => {
    //rejectBooking(item.key);
    //console.log(item.key);
    //setVal(true);
    socket.emit('pre book', preBookDetails);
    // console.log(preBookDetails);
    /* 1. Navigate to the Details route with params */
    //   navigation.navigate('RootScreen', {
    //     screen: 'Home',
    //     params: {
    //       screen: 'Home',
    //     },
    //   });
    // };
    navigation.reset('RootScreen', {
      routes: [
        {
          screen: 'Home',
          params: {
            screen: 'Home',
          },
        },
      ],
      index: routes.length - 1,
    });
  };

  React.useEffect(() => {
    socket = io('https://planit-fyp.herokuapp.com');
    rejectBooking(item.key);
    // if (val) {
    //   rejectBooking(item.key);
    //   socket.emit('pre book', preBookDetails);
    //   console.log(preBookDetails);
    // }
    // console.log(item.key);
    // setId(item.key);
    // rejectBooking(item.key);
    // console.log('Hello pre');
  }, [item, isFocused]);

  return (
    <View style={{flex: 1}}>
      <AntDesign
        name="arrowleft"
        size={18}
        style={{
          padding: 20,
          position: 'absolute',
          top: SPACING * 2,
          left: SPACING,
          zIndex: 2,
          marginBottom: 30,
        }}
        color={'#333'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TouchableOpacity
        onPress={() => press()}
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 25,
          marginBottom: 30,
        }}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </TouchableOpacity>
      <SharedElement id={`item.${item.key}.bg`}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: Colors.primary,
              borderRadius: 0,
              height: TOP_HEADER_HEIGHT + 32,
            },
          ]}
        />
      </SharedElement>
      <SharedElement id={`item.${item.key}.name`}>
        <Text style={styles.name}>{item.name}</Text>
      </SharedElement>
      <SharedElement id={`item.${item.key}.image`}>
        <Image source={{uri: item.image}} style={styles.image} />
      </SharedElement>
      <SharedElement id="general.bg">
        <View style={styles.bg}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: SPACING,
                marginBottom: SPACING + 32,
              }}>
              {detailsIcons.map((detail, index) => {
                return (
                  <Animatable.View
                    animation="bounceIn"
                    delay={DURATION + index * 100}
                    key={`${detail.icon}-${index}`}
                    style={{
                      backgroundColor: detail.color,
                      height: 64,
                      width: 64,
                      borderRadius: 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <AntDesign name={detail.icon} size={22} color={'white'} />
                  </Animatable.View>
                );
              })}
            </View>
            <View>
              <Animatable.View
                animation="fadeInUp"
                // delay={DURATION * 2 + index * 100}
                key={item.key}
                style={{marginVertical: SPACING}}>
                <Text style={styles.title}>{item.name}</Text>

                <View
                  key={item.key}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: SPACING / 2,
                    marginLeft: SPACING,
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 4,
                      backgroundColor: 'gold',
                      marginRight: SPACING,
                    }}
                  />
                  {/* <Button
                    style={styles.subTitle}
                    title="Press Me"
                    onPress={() => console.log(item.key)}
                  /> */}

                  <Text style={styles.subTitle}>{item.date}</Text>
                  <Text style={styles.subTitle}>{item.time}</Text>
                  <Text style={styles.subTitle}>{item.origin}</Text>
                  <Text style={styles.subTitle}>{item.destination}</Text>
                </View>
              </Animatable.View>
            </View>
          </ScrollView>
        </View>
      </SharedElement>
    </View>
  );
};

PreBookListDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.bg`,
    },
    {
      id: `item.${item.key}.name`,
    },
    {
      id: `item.${item.key}.image`,
    },
    {
      id: 'general.bg',
    },
  ];
};

export default PreBookListDetails;

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    fontSize: 20,
    position: 'absolute',
    top: TOP_HEADER_HEIGHT - SPACING * 3,
    left: SPACING,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: 'contain',
    position: 'absolute',
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8 + 10,
    right: SPACING,
  },
  bg: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'white',
    transform: [{translateY: TOP_HEADER_HEIGHT}],
    borderRadius: 32,
    padding: SPACING,
    paddingTop: 32 + SPACING,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: SPACING,
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.8,
  },
});
