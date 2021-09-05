import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

import Colors from '../../constants/Colors';
import AtThePark from '../../svg/AtThePark';
import {Button} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.firstRow}>
        <View style={styles.circleContainerOne}>
          <View style={styles.circleOne}></View>
          <View style={styles.circleTwo}></View>
          <View style={styles.circleThree}></View>
        </View>
        <AtThePark />
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.welcomeText}>WELCOME!!!</Text>
        <Text style={styles.supportText}>A travel and tour application</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.thirdRow}>
        <View style={styles.circleContainerTwo}>
          <View style={styles.circleVerticalone}></View>
          <View style={styles.circleVerticaltwo}></View>
          <View style={styles.circleVerticalthree}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

WelcomeScreen.navigationOptions = {
  headerTitle: 'Welcome',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    height: '10%',
    width: '10%',
  },
  firstRow: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  secondRow: {
    marginTop: 20,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdRow: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  circleContainerOne: {
    flexDirection: 'column',
    width: '10%',
  },
  circleContainerTwo: {
    flexDirection: 'column',
  },
  circleOne: {
    width: 103,
    height: 103,
    borderRadius: 51.5,
    left: -23,
    top: -24,
    backgroundColor: Colors.primary,
  },
  circleTwo: {
    width: 103,
    height: 103,
    borderRadius: 51.5,
    left: -43,
    top: -46,
    backgroundColor: Colors.primary,
  },
  circleThree: {
    width: 103,
    height: 103,
    borderRadius: 51.5,
    left: -63,
    top: -69,
    backgroundColor: Colors.primary,
  },
  welcomeText: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 36,
  },
  supportText: {
    fontWeight: 'normal',
    color: Colors.secondary,
    marginTop: 2,
  },
  circleVerticalone: {
    width: 103,
    height: 103,
    borderRadius: 51.5,
    left: '70%',
    top: '-40%',
    backgroundColor: Colors.primary,
  },
  circleVerticaltwo: {
    width: 103,
    height: 103,
    borderRadius: 51.5,
    left: '50%',
    top: '-50%',
    backgroundColor: Colors.primary,
  },
  circleVerticalthree: {
    width: 103,
    height: 103,
    borderRadius: 51.5,
    left: '30%',
    top: '-60%',
    backgroundColor: Colors.primary,
  },
  svgImage: {
    marginTop: 100,
  },
  button: {
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginTop: 30,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  lineGradient: {
    color: Colors.primary,
  },
});

export default WelcomeScreen;