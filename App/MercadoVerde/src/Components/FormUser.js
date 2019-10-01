import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';
import Header from './Header';

class FormUser extends Component {
    render() {
        return (<View>
          <Header></Header>
          <TextInput placeholder = 'Nome da Feira'>

          </TextInput>




        </View>)
          
      }
    
    }
export default FormUser;