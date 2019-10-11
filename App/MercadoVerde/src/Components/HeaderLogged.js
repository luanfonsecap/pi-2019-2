import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';

const HeaderLogged = (props) => {

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../img/icon-img.png')} />
      <Text style={styles.nome}>{props.nome}</Text>

      <TouchableOpacity style={styles.botaoSair}
       onPress={() =>{
        Promise.all([
          AsyncStorage.removeItem('tipo'),
          AsyncStorage.removeItem('nome'),
          AsyncStorage.removeItem('id'),
          AsyncStorage.removeItem('url'),
        ]).then(res => props.navigation.navigate('Home'));
        }}>
        <View>
          <Text style={styles.textoBotao}>Sair</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00BA51',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nome: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  img: {
    borderRadius: 50,
    width: 70,
    height: 70,
    padding: 10,
    margin: 10

  },
  botaoSair: {
    backgroundColor: '#00BA51',
    alignSelf: 'center'
  },
  textoBotao: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    paddingHorizontal: 15,
    padding: 5,
    margin: 15
  }
});

export default withNavigation(HeaderLogged);