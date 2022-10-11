import React, { useState, useEffect } from 'react';

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import BackgroundImage from '../img/BackgroundImage.png';
const colors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green: '#B9C6AE',
};

export default function Start(props) {
  let [name, setName] = useState();
  let [color, setColor] = useState();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.textbox}
            onChangeText={name => setName(name)}
            value={this.state.text}
            placeholder="Your Name..."
          />
          <Text style={styles.text}>Choose your chat background color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[{ backgroundColor: colors.black }, styles.colorbutton]}
              onPress={() => setColor(colors.black)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
              onPress={() => setColor(colors.purple)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.grey }, styles.colorbutton]}
              onPress={() => setColor(colors.grey)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.green }, styles.colorbutton]}
              onPress={() => setColor(colors.green)}
            />
          </View>
          <Button
            title="Start Chat"
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                name: this.setState({ name }),
                color: this.setState({ color }),
              })
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textbox: {
    height: 50,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: 0,
    color: 'white',
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
  },
  colorContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  colorbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  button: {
    height: 50,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
