import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import Header from '../Components/Header';
import styleInput from '../Components/Input';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      erro: null
    }
  }

  validacao(user, password) {

    if(user === '' || password === '') {
      Alert.alert('Erro', 'Preencha corretamente os campos.');
      return;
    }

    const uri = 'http://10.0.2.21:1337/login';
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: {'Content-type': 'application/json'}
    }
    
  fetch(uri, requestInfo)
    .then(res => res.json())
    .then(res => {
      console.log(res);      
    })
    .catch(e => {
      this.setState({erro: 'Não foi possível fazer login.'})
      console.log(e);
    });  
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
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.botaoGrupo}>
            <TextInput 
              style={styleInput}
              placeholder="Senha..."
              onChangeText={input => this.state.password = input}
              ref={input => this.inputPassword = input}
              secureTextEntry={true} 
              autoCorrect={false}
              autoCapitalize="none"
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

        <View>
          <Text style={styles.erro}>
            {this.state.erro}
          </Text>
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
  },
  erro:{
    marginTop: 15,
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 19
  }
});

export default Login;