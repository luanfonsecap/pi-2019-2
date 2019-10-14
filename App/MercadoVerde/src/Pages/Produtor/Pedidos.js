import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, AsyncStorage, FlatList, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Overlay } from 'react-native-elements';

import HeaderLogged from '../../Components/HeaderLogged';

const array = [
  { id: 1, user: 'Luiz Inácio', value: '26,00', local: 'Curitiba' },
  { id: 2, user: 'Sérgio Moro', value: '12,00', local: 'Brasilia' },
  { id: 3, user: 'Dilma Roussef', value: '36,00', local: 'São Paulo' },
  { id: 4, user: 'Michel Temer', value: '50,00', local: 'Brasilia' },
];

class PedidosRecebidos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  gerenciaPedido(id, user, value, local) {

    this.props.navigation.navigate('GerenciaPedido',
    { id, user, value, local });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <HeaderLogged nome="Luan" imagem={null} />
          <ImageBackground style={{ width: '100%', height: '100%' }}
            source={require('../../img/bg.png')}>
            <FlatList
              data={array}
              keyExtractor={array.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Text style={styles.nome}>Pedido de <Text style={styles.bold}>{item.user}</Text></Text>
                    <Text style={styles.valor}>R$ {item.value}</Text>
                    <Text style={styles.local}>{item.local}</Text>
                    <Button
                      title="Gerenciar"
                      buttonStyle={{ backgroundColor: '#EB5B65', marginTop: 10 }}
                      onPress={() => this.gerenciaPedido(item.id, item.user, item.value, item.local)}
                    />
                  </View>
                );
              }}
            />
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 3,
    padding: 20,
    margin: 25
  },
  nome: {
    fontSize: 19
  },
  bold: {
    fontWeight: 'bold'
  },
  valor: {
    color: '#EB5B65',
    fontSize: 17
  }
});

export default withNavigation(PedidosRecebidos);