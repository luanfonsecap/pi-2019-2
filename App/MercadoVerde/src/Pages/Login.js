import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Header from '../Components/Header';
import Button from '../Components/ButtonRed';
import ButtonRed from '../Components/ButtonRed';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    }
  }

  validacao(user, password) {

    if(user === '' || password === '')
      return;



  }

  render() {

    const { user, password } = this.state;

    return(
      <ImageBackground source={require('../img/bg-fruits-blur.png')}
        style={{width: '100%', height: '100%'}}
      >
      <View style={styles.login}>

        <Header />  

        <View style={styles.form}>
          <View style={styles.botaoGrupo}>
            <Text style={styles.label}>Usuário:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Seu nome de usuário"
              onChangeText={input => this.state.user = input}
              ref={input => this.inputUser = input}
            />
          </View>

          <View style={styles.botaoGrupo}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Insira sua senha"
              onChangeText={input => this.state.password = input}
              ref={input => this.inputPassword = input}
              secureTextEntry={true} 
            />  
          </View>
        </View>

        <View style={styles.areaBotao}>
          <TouchableOpacity onPress={() => {this.validacao(user,password)}} style={styles.botao}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </View>
      </ImageBackground> 

    );
  }

}

const styles = StyleSheet.create({
  login: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    width: 70
  }, 
  input: {
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#fff',
    borderWidth: 1,
    elevation: 1,
    width: 250
  },
  botao: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    borderColor: '#707070',
    width: '30%',
    elevation: 5,
    fontSize: 18
  },
  botaoTexto: {
    fontSize: 20,
    color: '#000',
    alignSelf: 'center'
  },
  areaBotao: {
    position: 'absolute',
    width: 600, 
    bottom: 30,
  },
  botaoGrupo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  }, 
  form: {
    backgroundColor: '#00BA51',
    padding: 15,
    borderRadius: 10
  }
});

export default Login;