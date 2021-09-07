import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity as TouchableOpacitys,
  ImageBackground,
  TextInput,
  StyleSheet,
  NativeModules,
  Pressable,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Platform} from 'react-native';
import Colors from '../../constants/Colors';
import {
  setOrigin,
  setDestination,
  selectUser,
  setUser,
} from '../../slices/navSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//import ImagePicker from 'react-native-image-crop-picker';
var ImagePicker = NativeModules.ImageCropPicker;

const EditProfileScreen = ({navigation}) => {
  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [imageUri, setimageUri] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };
  // const takePhotoFromCamera = () => {
  //   const options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'photo',
  //     },
  //     includeBase64: true,
  //   };

  //   launchCamera(options, (response) => {
  //     console.log('Response = ', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       // You can also display the image using data:
  //       const source = {uri: 'data:image/jpeg;base64,' + response.base64};
  //       setimageUri(source);
  //       this.bs.current.snapTo(1);
  //     }
  //   });
  // };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  // const choosePhotoFromLibrary = () => {
  //   const options = {
  //     mediaType: 'photo',
  //   };

  //   launchImageLibrary(options, (callBack) => {
  //     console.log('Response = ', callBack);
  //     this.bs.current.snapTo(1);
  //   });
  // };

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [token, setToken] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  // var token = "";
  const [message, setMessage] = React.useState('');
  const userInformation = useSelector(selectUser);

  useEffect(() => {
    // console.log(userInformation);
    console.log(userInformation.id);
  }, []);

  const handleEdit = async (id) => {
    console.log('edit pressed');
    console.log(id);

    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/users/update/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          country,
          avatar: image,
        }),
      },
    );
    const response = await res.json();
    console.log(response);
    //storeData(response.name);

    if (response.token) {
      setToken(response.token);
      // userInformation.name = name;
      // userInformation.phone = phone;
      // userInformation.email = email;
      // userInformation.city = city;
      // userInformation.country = country;

      dispatch(
        setUser({
          ...userInformation,
          name: response.name,
          phone: response.phone,
          token: response.token,
          email: response.email,
          city: response.city,
          country: response.country,
          avatar: response.avatar,
        }),
      );
      alert('User Updated');
      setName('');
      setPhone('');
      setEmail('');
      setCity('');
      setCountry('');
      //setImage('');
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          takePhotoFromCamera();
        }}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          choosePhotoFromLibrary();
        }}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      {Platform.OS === 'android' ? (
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacitys
          style={styles.panelButton}
          onPress={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacitys>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                      backgroundColor: 'black',
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {userInformation.name}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(name) => {
              setName(name);
            }}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={(phone) => {
              setPhone(phone);
            }}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Country"
            value={country}
            onChangeText={(country) => {
              setCountry(country);
            }}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={(city) => {
              setCity(city);
            }}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => handleEdit(userInformation.id)}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
      <Pressable
        onPress={() => {
          navigation.toggleDrawer();
          console.log('Hello drawer');
        }}
        style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  roundButton: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
});
