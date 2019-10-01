import React, { Component } from 'react';
import {
  StyleSheet} from 'react-native';

import Button from './Button'

class ButtonRed extends Component {

  render() {
    return (
      <Button ButtonStyle={styles.botao} TextStyle={styles.texto}></Button>
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