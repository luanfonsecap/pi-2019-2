import React from 'react';
import {
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

const Home = () => {

  return(
    <View style={styles.home}>

      <View style={styles.shadow}>
        <Image source={require('../src/img/logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.subtitulo}>
        Comer bem faz bem!
      </Text>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao}>
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
    width: 350,
    alignSelf: 'center',
    marginBottom: 100,
    borderRadius: 15,
  },
  shadow: {
    elevation: 5
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