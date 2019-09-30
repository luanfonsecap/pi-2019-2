import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class ButtonRed extends Component {

  render() {
    return (
      <View style={styles.botao}>
        <Text style={styles.texto}>{this.props.title}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#EB5B65',
    padding: 2,
    borderRadius: 3,
    width: 100,
    padding: 7
  },
  texto: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

export default ButtonRed;