import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import ArrowBack from './ArrowBack';

const Header = () => {

  return(
    <View style={styles.header}>
      <ArrowBack />
      <Text style={styles.text}>Mercado Verde</Text>
    </View>
  ); 

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BA51',
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 5
  }, 
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Header;