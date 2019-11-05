import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, AsyncStorage, FlatList, ScrollView, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';

import HeaderLogged from '../../Components/HeaderLogged';
import url from '../../services/url';

//simulção de dados vindos do servidor
const pedidos = [
  {
    id: 1, id_cliente: 1, nome: 'Luiz Inácio', valor: '26,00', bairro: 'Curitiba', produtos: [
      { nome: 'Alface Americana', und: 3, kg: null },
      { nome: 'Abacaxi', und: 1, kg: null },
      { nome: 'Tomate', und: null, kg: 2 },
    ]
  },
  {
    id: 1, id_cliente: 2, nome: 'Sérgio Moro', valor: '12,00', bairro: 'Brasilia', produtos: [
      { nome: 'Alface Americana', und: 4, kg: null },
      { nome: 'Abacaxi', und: 2, kg: null },
      { nome: 'Tomate', und: null, kg: 1 },
    ]
  },
  {
    id: 1, id_cliente: 3, nome: 'Dilma Roussef', valor: '36,00', bairro: 'São Paulo', produtos: [
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
      pedidos: null,
    }
    this.buscaDados();
  }

  buscaDados() {

    AsyncStorage.getItem('id')
      .then(id => {

        fetch(`${url}read/pedprodutor`, {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(res => {
            this.setState({ pedidos: res });
            console.log(this.state.pedidos);
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

  gerenciaPedido(id, valorTotal, local) {
    console.log(id);

    fetch(`${url}read/pedido`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        
        const produtos  = res[0].produtos;
        const cliente = res[0].nome_cliente;
        const id = res[0].id_cliente;

        this.props.navigation.navigate('GerenciaPedido',
          { id, cliente, valorTotal, local, produtos });
      })

  }

  render() {
    return (
      <ScrollView>
        <View>
          <HeaderLogged nome="Luan" imagem={null} />
          <ImageBackground style={{ width: '100%', height: '100%' }}
            source={require('../../img/bg.png')}>
            <FlatList
              data={this.state.pedidos}
              keyExtractor={pedidos.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Text style={styles.nome}>Pedido de <Text style={styles.bold}>{item.nome}</Text></Text>
                    <Text style={styles.valor}>R$ {item.valor}</Text>
                    <Text style={styles.local}>{item.bairro}</Text>
                    <Button
                      title="Gerenciar"
                      buttonStyle={{ backgroundColor: '#EB5B65', marginTop: 10 }}
                      onPress={() => this.gerenciaPedido(item.id, item.valor, item.bairro)}
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