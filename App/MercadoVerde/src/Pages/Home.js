import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native';

function Home({navigation}) {

  return(
    <View style={styles.home}>

      <View >
        <Image source={require('../img/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Esse componente precisa animar o texto fazendo alteração de frases */}
      <Text style={styles.subtitulo}>
        Comer bem, faz bem!
      </Text>


      <TouchableOpacity onPress={() => {navigation.navigate('Login')}}
        style={[styles.botao, styles.shadow]}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('Presentation')}}
        style={[styles.botao, styles.shadow]}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#007A35',
    height: '100%',
    justifyContent: 'center'
  },
  botao: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    borderColor: '#707070',
    width: '80%',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  botaoTexto: {
    fontSize: 25,
    color: '#000',
    alignSelf: 'center'
  },
  logo: {
    width: 300,
    height: 240,
    alignSelf: 'center',
    marginBottom: 100,
    borderRadius: 15,
  },
  shadow: {
    elevation: 5,

  },
  subtitulo: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    position: 'absolute',
    top: '53%'
  }
});

export default Home;