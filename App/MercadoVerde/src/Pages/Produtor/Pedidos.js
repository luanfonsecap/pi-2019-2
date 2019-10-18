import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, AsyncStorage, FlatList, ScrollView, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';

import HeaderLogged from '../../Components/HeaderLogged';
import url from '../../services/url';

//simulção de dados vindos do servidor
const pedidos = [
  {
    id: 1, user: 'Luiz Inácio', value: '26,00', local: 'Curitiba', produtos: [
      { nome: 'Alface Americana', und: 3, kg: null },
      { nome: 'Abacaxi', und: 1, kg: null },
      { nome: 'Tomate', und: null, kg: 2 },
    ]
  },
  {
    id: 2, user: 'Sérgio Moro', value: '12,00', local: 'Brasilia', produtos: [
      { nome: 'Alface Americana', und: 4, kg: null },
      { nome: 'Abacaxi', und: 2, kg: null },
      { nome: 'Tomate', und: null, kg: 1 },
    ]
  },
  {
    id: 3, user: 'Dilma Roussef', value: '36,00', local: 'São Paulo', produtos: [
      { nome: 'Alface Americana', und: 4, kg: null },
      { nome: 'Abacaxi', und: 2, kg: null },
      { nome: 'Tomate', und: null, kg: 1 },
    ]
  },
  {
    id: 4, user: 'Michel Temer', value: '50,00', local: 'Brasilia', produtos: [
      { nome: 'Alface Americana', und: 4, kg: null },
      { nome: 'Abacaxi', und: 2, kg: null },
      { nome: 'Tomate', und: null, kg: 1 },
    ]
  },
];

class PedidosRecebidos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      pedidos: []
    }
    this.buscaDados();
  }

  buscaDados() {

    AsyncStorage.getItem('id')
      .then(id => {

        fetch(`${url}`, {
          method: 'POST',
          //envia id do produtor para buscar pedido relacionados a ele
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json)
          //atualiza o array de pedidos dentro do estado do componente com os 
          //dados vindos dos servidor
          .then(res => {
            this.setState({ pedidos: res });
          })
          .catch(e => {
            console.log(e)
            Alert.alert('Erro', 'Não foi possível receber dados do servidor.');
          });
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Erro', 'Dados de usuário não encontrados, favor reiniciar aplicativo.')
      })

  }

  gerenciaPedido(id, cliente, valor, local, produtos) {
    this.props.navigation.navigate('GerenciaPedido',
      { id, cliente, valor, local, produtos });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <HeaderLogged nome="Luan" imagem={null} />
          <ImageBackground style={{ width: '100%', height: '100%' }}
            source={require('../../img/bg.png')}>
            <FlatList
              //recebe os dados de pedidos pelo estado do componente para
              //renderizar os cards
              data={pedidos}
              keyExtractor={pedidos.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Text style={styles.nome}>Pedido de <Text style={styles.bold}>{item.user}</Text></Text>
                    <Text style={styles.valor}>R$ {item.value}</Text>
                    <Text style={styles.local}>{item.local}</Text>
                    <Button
                      title="Gerenciar"
                      buttonStyle={{ backgroundColor: '#EB5B65', marginTop: 10 }}
                      onPress={() => this.gerenciaPedido(item.id, item.user, item.value, item.local, item.produtos)}
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