import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Badge } from 'react-native-elements';

import HeaderLogged from '../../Components/HeaderLogged';

class Index extends Component {

  badge() {

/*     AsyncStorage.getItem('id').then(id => {
      
      fetch('url', {
        method: 'POST',
        body: JSON.stringify({id}),
        headers: {'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .then(res => {
        if(res >= 1) {
          return (
            <Badge value={res} status="success"
              badgeStyle={{ height: 20, width: 40 }}
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
            />
          );
        } else {
          return;
        }
      })
    }).catch(e => console.log(e)); */    

    if (3 == 3) {

      return (
        <Badge value="4" status="success"
          badgeStyle={{ height: 20, width: 40 }}
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      );
    } else {
      return;
    }
  }

  render() {

    return (
      <View>
        <HeaderLogged nome="Luan" imagem={null} />
        <ImageBackground style={{ width: '100%', height: '100%' }}
          source={require('../../img/bg.png')}>

          <View style={styles.container}>

            <View style={styles.card}>
              {this.badge()}
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Pedidos')}>
                <Text style={styles.botaoTexto}>Pedidos Recebidos</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.card}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Gerenciar')}>
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