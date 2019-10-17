import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import ButtonGreen from '../Components/ButtonGreen';

function Presentation({ navigation }) {

  return (
    <ScrollView style={{backgroundColor: 'rgba(0,122,53, 0.9)'}}>

      <View style={styles.cardPresentation}>
        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.textPresentation}>
          O Mercado Verde tem como objetivo
          conectar e aproximar produtores
          com clientes diretos, facilitando
          a compra de produtos
          frescos e livres de agrotóxicos.
          </Text>
      </View>

      <View style={styles.cardCadastro}>
        <Text style={styles.textCadastro}>Como gostaria de se cadastrar?</Text>
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
    marginTop: 75,
    padding: 15,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  textPresentation: {
    fontSize: 19
  },
  cardCadastro: {
    marginTop: 200,
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