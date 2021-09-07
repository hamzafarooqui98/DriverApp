import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {
//   CreditCardInput,
//   LiteCreditCardInput,
// } from 'react-native-credit-card-input';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';

const Payment = () => {
  const onChange = (form) => console.log(form);
  return (
    <View>
      <CreditCardInput onChange={onChange} />

      {/* <LiteCreditCardInput onChange={onChange} /> */}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
