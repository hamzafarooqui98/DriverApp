import * as React from 'react';
import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {selectUser} from '../../slices/navSlice';
import {useSelector} from 'react-redux';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + 70 * 3;

const YourTripsScreen = (props) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const userInformation = useSelector(selectUser);
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const getData = async (id) => {
    setIsFetching(true);
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/getOrderByUserId/${id}`,
    );
    const response = await res.json();
    console.log(response);
    const orders = response.data.map((x) => {
      return {
        key: x._id,
        image: x.avatar,
        name: x.name,
        phone: x.phone,
        origin: x.origin,
        destination: x.destination,
        cost: x.cost,
      };
    });
    setData(orders);
    setIsFetching(false);
  };

  React.useEffect(() => {
    getData(userInformation.id);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isFetching ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
          color="green"
        />
      ) : (
        <View>
          <Image
            source={require('../../assets/MainLogoPlaniT.png')}
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
                    <Text style={{fontSize: 14, opacity: 0.7, flexShrink: 1}}>
                      <Text style={{color: 'green', fontWeight: 'bold'}}>
                        Origin:{' '}
                      </Text>
                      {item.origin}
                    </Text>
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
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        opacity: 0.7,
                        color: 'black',
                        flexWrap: 'wrap',
                      }}>
                      <Text style={{color: 'green', fontWeight: 'bold'}}>
                        Cost:{' '}
                      </Text>
                      {item.cost}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
          <Pressable
            onPress={() => {
              props.navigation.toggleDrawer();
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
        </View>
      )}
    </View>
  );
};

export default YourTripsScreen;
