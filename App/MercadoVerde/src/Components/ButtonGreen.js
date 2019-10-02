import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class ButtonGreen extends Component {

  render() {
    return(
        <View style={styles.botao}>
          <Text style={styles.texto}>{this.props.title}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#4BEC91',
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

export default ButtonGreen;