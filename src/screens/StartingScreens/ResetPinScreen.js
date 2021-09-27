// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Input from '../../components/Input';
// import Colors from '../../constants/Colors';
// import {Button} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const ResetPinScreen = (props) => {
//   const numberPin = props.route.params.numberPin;
//   const resendPin = props.route.params.resendPin;
//   const navigation = useNavigation();
//   return (
//     <View style={styles.screen}>
//       <View style={styles.textContainer}>
//         <Text style={styles.pinText}>RESET PIN</Text>
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.getPin}>
//           {numberPin ? 'Enter Number' : resendPin ? 'Enter E-mail' : ''}
//         </Text>
//         <Input
//           blurOnSubmit
//           autoCapitilize="none"
//           maxLength={50}
//           keyboardType={
//             numberPin ? 'numeric' : resendPin ? 'email-address' : ''
//           }
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <View>
//           <Button
//             onPress={() => {
//               navigation.navigate('EnterPinScreen');
//             }}
//             title="NEXT"></Button>
//         </View>
//       </View>
//     </View>
//   );
// };

// ResetPinScreen.setOptions = (navData) => {
//   const numberPin = navData.route.params.numberPin;
//   const resendPin = navData.route.params.resendPin;
//   return {
//     headerTitle: numberPin ? 'Enter Number' : resendPin ? 'Enter E-mail' : '',
//   };
// };

// const styles = StyleSheet.create({
//   screen: {
//     height: '100%',
//   },
//   textContainer: {
//     alignSelf: 'flex-start',
//     marginLeft: 30,
//     marginTop: 30,
//     height: '10%',
//   },
//   pinText: {
//     fontWeight: '400',
//     fontSize: 30,
//   },
//   getPin: {
//     fontWeight: 'normal',
//     color: Colors.secondary,
//     fontSize: 17,
//   },
//   inputContainer: {
//     height: '30%',
//     width: '80%',
//     justifyContent: 'center',
//     marginTop: 20,
//     marginLeft: 30,
//   },
//   numberText: {
//     fontSize: 16,
//   },
//   buttonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 40,
//   },
// });

// export default ResetPinScreen;
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper';
//import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../constants/Colors';
import Input from '../../components/Input';

const ResetPinScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../assets/MainLogoPlaniT.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: 'white',
          },
        ]}
        animation="fadeInUpBig">
        <View style={{marginTop: -100}}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}>
            Please enter the One Time Password!
          </Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            keyboardType="number-pad"
            maxLength={7}
            style={
              (styles.textInput,
              {
                color: colors.text,
                height: '30%',
                width: '50%',
                fontSize: 35,
              })
            }
          />

          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsOfUseScreen')}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Continue</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ResetPinScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 200,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
