import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';
import HeaderLogged from '../../Components/HeaderLogged';
import { Icon } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

class Carrinho extends Component {

  constructor() {
    super();
    this.state = {
      sacola: global.sacolaGlobal,
    }
  }

  componentDidMount() {

    console.log(this.state.sacola);
  }

  render() {

    return (
      <Fragment>
        <ImageBackground source={require('../../img/bg.png')}
          style={{ width: '100%', height: '100%' }}
        >

          <HeaderLogged />
          <View style={styles.header}>
            <Icon style={styles.bag} type="Feather" name="shopping-bag" />
            <Text style={styles.titulo}>Sua sacola de compras</Text>
          </View>

          <FlatList 
            data={this.state.sacola}
            keyExtractor={this.state.sacola.id}
            renderItem={({ item }) => {
              return(
                <View style={styles.prod}>
                  <Image />
                  <Text style={styles.prodNome}>{item.nome}</Text>
                  <Text style={styles.prodQtde}>Qtde: {item.qtde}</Text>
                  <Text style={styles.prodValor}>R$ {item.valor}</Text>
                  <TouchableOpacity style={styles.prodRemover}>
                    <Icon type="Feather" name="x-circle" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

        </ImageBackground>
      </Fragment>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#dadada',
    borderBottomWidth: 2,
    elevation: 3,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bag: {
    fontSize: 35,
    marginHorizontal: 5
  },
  titulo: {
    marginHorizontal: 5,
    fontSize: 20
  },
});

export default Carrinho;