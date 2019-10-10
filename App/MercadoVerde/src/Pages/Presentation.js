import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import Frutas from '../img/fruits-presentation.png';
import ButtonGreen from '../Components/ButtonGreen';

function Presentation({navigation}) {

  return (
    <ScrollView>

      <View style={styles.container}>


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

        <Image source={Frutas} 
          resizeMode="contain" style={styles.imagem}/>

        <View style={styles.cardCadastro}>
          <Text style={styles.textCadastro}>Como gostaria de se cadastrar?</Text>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={() => {navigation.navigate('CadProdutor')}}>
            <ButtonGreen 
              title="Produtor" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('CadClient')}}>
            <ButtonGreen 
              title="Consumidor" />
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007A35',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cardPresentation: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 2,
    marginRight: 20,
    marginLeft: 20,
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

  imagem: {
    height: 300
  },

  cardCadastro: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    elevation: 2,
    borderRadius: 2
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
    height: 100
  }
});

export default Presentation;