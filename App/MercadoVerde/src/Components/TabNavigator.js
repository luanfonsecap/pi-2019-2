import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TabNavigator = () => {

  return(
    <View style={styles.container}>
      <Text>Tab Navigator</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
  }
});

export default TabNavigator;