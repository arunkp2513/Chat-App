import React from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { initializeApp } from 'firebase/app';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
    };

    //Setup firebase
    const firebaseConfig = {
      apiKey: 'AIzaSyBNSyokvCNX2IA2uWyA5X8-uMfUrS0w3Cg',
      authDomain: 'chat-app-9d036.firebaseapp.com',
      projectId: 'chat-app-9d036',
      storageBucket: 'chat-app-9d036.appspot.com',
      messagingSenderId: '276637031584',
      appId: '1:276637031584:web:6158194b820a440750bdc5',
      measurementId: 'G-2J5HV2GNDB',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // Reference to Firestore collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = querySnapshot => {
    const messages = [];
    // go through each document
    querySnapshot.forEach(doc => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  componentDidMount() {
    let { name } = this.props.route.params;
    // Set window title
    this.props.navigation.setOptions({ title: name });

    // Reference to load messages from Firebase
    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user._id,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMesaages
        .orderBy('createdAt', 'desc')
        .onSanpshot(this.onCollectionUpdate);
    });
  }
  // Add message to Firestore
  addMessages = message => {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
    });
  };

  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages(this.state.messages);
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
        }}
      />
    );
  }
  componentWillUnmount() {
    this.authUnsubscribe();
  }

  render() {
    let { color } = this.props.route.params;
    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{ _id: this.state.user._id, name: this.state.user.name }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
