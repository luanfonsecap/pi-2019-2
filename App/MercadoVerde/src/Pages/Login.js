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

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    }
  }

  render() {
    return(
      <ImageBackground source={require('../img/bg-fruits.jpg')}
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
              onChangeText={input => this.setState({user: input})}
              value={this.state.user}
            />
          </View>

          <View style={styles.botaoGrupo}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Insira sua senha"
              onChangeText={input => this.setState({password: input})}
              value={this.state.password}
              secureTextEntry={true} 
            />  
          </View>
        </View>

        <View style={styles.areaBotao}>
          <TouchableOpacity style={styles.botao}>
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
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#dadada',
    margin: 15,
    margin: 10,
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
    alignItems: 'center'
  }, 
  form: {
    backgroundColor: '#007A35',
    padding: 15,
    borderRadius: 10
  }
});

export default Login;