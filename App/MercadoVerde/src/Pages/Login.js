import React, { Component, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert, AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header } from 'native-base';

import styleInput from '../Components/Input';
import url from '../services/url';
import * as Progress from 'react-native-progress';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      erro: null,
      display: 'none',
      progress: 0.3,
      color: "#4BEC91"
    }
    this.verificaLogin();
  }

  verificaLogin() {

    AsyncStorage.getItem('tipo')
      .then(storage => {
        switch (storage) {
          case 'C':
            this.props.navigation.navigate('IndexC');
            break;

          case 'P':
            this.props.navigation.navigate('IndexP');
            break;

          default:
            break;
        }
      })
  }

  validacao(usuario, senha) {

    if (usuario === '' || senha === '') {
      Alert.alert('Erro', 'Preencha corretamente os campos.');
      return;
    }

    this.setState({ display: 'flex', progress: 0.3, color: "#4BEC91", erro: null });

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ usuario, senha }),
      headers: { 'Content-type': 'application/json' }
    }

    fetch(`${url}login`, requestInfo)
      .then(res => res.json())
      .then(res => {
        this.setState({ progress: 0.5 });
        this.setState({ progress: 0.8 });
        if (res[0].status) {
          console.log('Enviado requisição de login.');
          Promise.all([
            AsyncStorage.setItem('tipo', res[0].tipo),
            AsyncStorage.setItem('nome', res[0].nome),
            AsyncStorage.setItem('id', `${res[0].id}`),
            AsyncStorage.setItem('url', res[0].urlImagem),
            AsyncStorage.setItem('cidade', res[0].cidade),
          ]);
          console.log('Dados de usuário salvos.');
          this.setState({ progress: 1 });

          res[0].tipo === 'C' ? this.props.navigation.navigate('IndexC') : this.props.navigation.navigate('IndexP');
          console.log('Redirecionando usuário.');
        } else {
          this.setState({ erro: res[0].msg, color: 'red', progress: 0 });
        }
      })
      .catch(e => {
        this.setState({ display: 'none' });
        this.setState({ erro: 'Não foi possível fazer login.' });
        console.log(e);
      });
  }

  render() {

    return (
      <ImageBackground source={require('../img/bg.png')}
        style={{ width: '100%', height: '100%' }}
      >
      <Header androidStatusBarColor="#00BA51" style={{ display: 'none' }}></Header>

        <View style={styles.login}>


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
            <TouchableOpacity onPress={() => {
              this.validacao(
                this.state.user, this.state.password
              )
            }} style={styles.botao}>
              <Text style={styles.botaoTexto}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.erro}>
              {this.state.erro}
            </Text>
          </View>

          <Progress.Bar progress={this.state.progress} color={this.state.color} width={200} style={{ display: this.state.display }} />

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
    fontSize: 18,
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
  erro: {
    marginTop: 15,
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 19
  }
});

export default withNavigation(Login);