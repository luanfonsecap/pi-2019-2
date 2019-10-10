import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

const Header = () => {

  return (
    <View style={styles.header}>
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
    justifyContent: 'center',
    elevation: 5,
    height: '100%'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Header;