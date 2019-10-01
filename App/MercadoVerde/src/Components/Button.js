
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class Button extends Component {

  render() {
    return (
      <TouchableOpacity>
        <View style={this.props.ButtonStyle}>
          <Text style={this.props.TextStyle}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

export default Button;