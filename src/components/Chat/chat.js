import React, {useEffect, useState, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';
//import { FontAwesome } from "@expo/vector-icons";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';
const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io('https://planit-fyp.herokuapp.com');
    socket.on('guide message', (msg) => {
      var msgArray = [
        {
          _id: msg[0]._id,
          text: msg[0].text,
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar:
              'https://th.bing.com/th/id/OIP.VlLvg3eZH0pRik3EQCgirgHaFj?w=253&h=190&c=7&o=5&pid=1.7',
          },
          sent: false,
          received: false,
          pending: false,
        },
      ];

      setMessages((messages) => [msgArray[0], ...messages]);

      console.log(msgArray);
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

    socket.emit('chat message', messages);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          iconStyle: {color: '#fff'},
        }}
        centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
        rightComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Entypo
              name={'phone'}
              size={30}
              color="#fff"
              style={{padding: 10}}
            />
            <FontAwesome name={'whatsapp'} size={30} color="black" />
          </View>
        }
      />
      <GiftedChat
        messages={messages}
        showUserAvatar
        showAvatarForEveryMessage
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          avatar:
            'https://th.bing.com/th/id/OIP.Hz2zc6bs5XSwenctIT5FmgHaG4?w=204&h=190&c=7&o=5&pid=1.7',
        }}
      />
    </View>
  );
};

export default Chat;
