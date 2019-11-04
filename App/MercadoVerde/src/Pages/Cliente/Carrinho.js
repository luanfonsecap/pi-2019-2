import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';

class Carrinho extends Component  {

  componentDidMount() {

    console.log(global.sacolaGlobal);
  }

  render() {

    return(
      <View>
        <Text>Carrinho</Text>
      </View>
    );
  }

}

export default Carrinho;