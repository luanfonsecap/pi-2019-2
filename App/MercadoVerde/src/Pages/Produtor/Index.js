import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Badge } from 'react-native-elements';
import { Header } from 'native-base';

import HeaderLogged from '../../Components/HeaderLogged';
import url from '../../services/url';

class Index extends Component {

  constructor() {
    super();
    this.state = {
      nPedidos: 0,
      status: 'success'
    }
  }

  componentDidMount() {

    AsyncStorage.getItem('id')
      .then(id => {
        console.log(id);
        fetch(`${url}read/pedprodutor`, {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            res.length >= 1 ? this.setState({ nPedidos: res.length, status: 'error' }) : null;
          })
      })
  }

  render() {

    return (
      <View>
        <Header androidStatusBarColor="#00BA51" style={{ display: 'none' }}></Header>
        <HeaderLogged />
        <ImageBackground style={{ width: '100%', height: '100%' }}
          source={require('../../img/bg.png')}>

          <View style={styles.container}>
            <View style={styles.card}>
              <Badge value={this.state.nPedidos} status={this.state.status}
                badgeStyle={{ height: 20, width: 30 }}
                containerStyle={{ position: 'absolute', top: -7, right: -7 }}
              />
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Pedidos')}>
                <Text style={styles.botaoTexto}>Pedidos Recebidos</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.card}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('GerenciaProduto')}>
                <Text style={styles.botaoTexto}>Gerenciar Produtos</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.card}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AltDados')}>
                <Text style={styles.botaoTexto}>Alterar Dados</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.card}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Mercado')}>
                <Text style={styles.botaoTexto}> Mercado </Text>
              </TouchableWithoutFeedback>
            </View>

          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    margin: 25,
    backgroundColor: '#fff',
    padding: 30,
    elevation: 5,
    borderRadius: 5,
    minWidth: 300,
  },
  botaoTexto: {
    fontSize: 20,
    alignSelf: 'center'
  }
});

export default withNavigation(Index);