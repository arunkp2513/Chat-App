import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

export default class Chat extends React.Component {
  render() {
    let color = this.props.route.params.color;
    let name = this.props.route.params.name;
    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        <Text>Name : {name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
