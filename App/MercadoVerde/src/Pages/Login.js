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
import styleInput from '../Components/Input';

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

    const uri = '';

      const requestInfo = {
        method: 'POST',
        body: JSON.stringify({user, password}),
        headers: new Headers({
          'Content-type': 'application/json'
        })
      }
    
  fetch(uri, requestInfo)
    .then(res => res.json())
    /* Lógica do token */
    .then(res => console.log(res))
    .catch(e => console.log(e));  

  }

  render() {

    return(
      <ImageBackground source={require('../img/bg-fruits-blur.png')}
        style={{width: '100%', height: '100%'}}
      >
      <View style={styles.login}>

        <Header />  

        <View style={styles.form}>
          <View style={styles.botaoGrupo}>
            <TextInput 
              style={styleInput}
              placeholder="Usuário..."
              onChangeText={input => this.state.user = input}
              ref={input => this.inputUser = input}
            />
          </View>

          <View style={styles.botaoGrupo}>
            <TextInput 
              style={styleInput}
              placeholder="Senha..."
              onChangeText={input => this.state.password = input}
              ref={input => this.inputPassword = input}
              secureTextEntry={true} 
            />  
          </View>
        </View>

        <View style={styles.areaBotao}>
          <TouchableOpacity onPress={() => {this.validacao(
            this.state.user, this.state.password
            )}} style={styles.botao}>
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
    width: 600, 
    marginTop: 15
  },
  botaoGrupo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  }, 
  form: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    elevation: 5
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#707070',
    borderWidth: 1,
    elevation: 1,
    width: 250,
    height: 15
  }
});

export default Login;