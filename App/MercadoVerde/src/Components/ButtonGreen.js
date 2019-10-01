import React, { Component } from 'react';
import {
  
  StyleSheet} from 'react-native';

import Button from './Button'

class ButtonGreen extends Component {

  render() {
    return (
      <Button ButtonStyle={styles.botao} TextStyle={styles.texto}></Button>
    );
  }

}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#66be76',
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