import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

import ButtonGreen from '../Components/ButtonGreen';

function Presentation({ navigation }) {

  return (
    <ScrollView style={{backgroundColor: 'rgba(0,122,53, 0.8)'}}>

      <View style={styles.cardPresentation}>
        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.textPresentation}>
          O Mercado Verde, tem como objetivo
          conectar e aproximar produtores rurais
          à clientes direto.
          Facilitando a compra de produtos
          frescos e livres de agrotóxicos!
          </Text>
      </View>

      <Image style={styles.img}
        source={require('../assets/groceries.png')} />

      <View style={styles.cardCadastro}>
        <Text style={styles.textCadastro}>Como gostaria de se cadastrar ?</Text>
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity onPress={() => { navigation.navigate('CadProdutor') }}>
          <ButtonGreen
            title="Produtor" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('CadClient') }}>
          <ButtonGreen
            title="Consumidor" />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardPresentation: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 2,
    marginHorizontal: 20,
    marginTop: 45,
    marginBottom: 50,
    padding: 15,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  textPresentation: {
    fontSize: 19
  },
  img: {
    alignSelf: 'center',
  },
  cardCadastro: {
    marginTop: 60,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    elevation: 2,
    borderRadius: 2,
  },
  textCadastro: {
    fontSize: 19
  },
  buttonArea: {
    flexDirection: 'row',
    padding: 30,
    alignContent: 'space-around',
    justifyContent: "space-between",
    width: '100%',
  }
});

export default Presentation;