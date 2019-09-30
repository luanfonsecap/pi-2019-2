import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet
} from 'react-native';

class Input extends Component {

  render() {

    return (
      <View>
        <TextInput
          placeholder={this.props.placeholder}
          style={styles.input}
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