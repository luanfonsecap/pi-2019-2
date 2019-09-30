import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet
} from 'react-native';

class Input extends Component {

  render() {

    const { placeholder, secureTextEntry } = this.props;

    return (
      <View>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#707070',
    borderWidth: 1,
    elevation: 1,
    width: 250
  }
});

export default Input;