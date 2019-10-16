import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, } from 'react-native';

import HeaderLogged from '../../Components/HeaderLogged';
import ButtonGreen from '../../Components/ButtonGreen';
import ButtonRed from '../../Components/ButtonRed';

/* os produtos do pedido são passados por params, recebidos na req da página anterior */

//função para confirmação do pedido
function aceitaPedido(id) {

  fetch('url', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(res => {
      res[0].status ? Alert.alert('Sucesso!', 'O pedido foi confirmado.') : Alert.alert('Falhou!', 'O pedido não foi confirmado.')
    })
    .cactch(e => console.log(e));
}

//função para negar pedido e redirecionar a tela de pedidos
function recusaPedido(id) {

  fetch('url', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(res => {
      res[0].status ? Alert.alert('Sucesso!', 'O pedido foi recusado.') : Alert.alert('Falhou!', 'Falha ao recusar pedido.');

      navigation.navigate('Pedidos');
    })
    .cactch(e => console.log(e));
}

function quantidade(kg, und) { 
  if(kg) {
    return `${kg} Kg.`; 
  } else {
    return `${und} Und.`; 
  }
 }

const GerenciaPedido = ({ navigation }) => {

  return (
    <View>
      <HeaderLogged nome="Luan" />
      <ImageBackground style={{ width: '100%', height: '100%' }}
        source={require('../../img/bg.png')}>

        <View style={styles.card}>
          <Text style={styles.cliente}>Pedido de {navigation.getParam('cliente')}</Text>
          <View style={styles.detalhes}>
            <View style={styles.valor}>
              <Text style={styles.valorTitulo}>Valor:</Text>
              <Text style={styles.valorConteudo}>{navigation.getParam('valor')}</Text>
            </View>
            <View style={styles.local}>
              <Text style={styles.localTitulo}>Bairro:</Text>
              <Text style={styles.localConteudo}>{navigation.getParam('local')}</Text>
            </View>
            <View style={styles.cabecalho}>
              <Text style={styles.cabecalhoTitulo}>Produtos:</Text>
              <Text style={styles.cabecalhoTitulo}>QTDE</Text>
            </View>
          </View>

          {console.log(navigation.getParam('produtos'))}

          <View style={styles.produtos}>
            {/*Renderização de produtos vindos pelo params (array de objetos)*/}
            {
              navigation.getParam('produtos').map(produto => {
                return (
                  <View style={styles.relacaoProdutos} key={produto.nome}>
                    <Text style={styles.detalhesProduto}>{produto.nome}</Text>
                    <Text style={styles.detalhesProduto}>{quantidade(produto.kg, produto.und)}</Text>
                  </View>
                );
              })
            }
          </View>

          <View style={styles.botoes}>
            <TouchableOpacity onPress={() => recusaPedido(navigation.getParam('id'))}>
              <ButtonRed title="Recusar" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => aceitaPedido(navigation.getParam('id'))}>
              <ButtonGreen title="Aceitar" />
            </TouchableOpacity>
          </View>

        </View>

      </ImageBackground>
    </View>
  );

}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    padding: 10,
    margin: 20,
  },
  cliente: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5
  },
  detalhes: {
    flexDirection: 'row',
    justifyContent: "space-around",
    flexWrap: 'wrap'
  },
  valor: {
    padding: 5
  },
  local: {
    padding: 5
  },
  valorTitulo: {
    fontSize: 17
  },
  localTitulo: {
    fontSize: 17
  },
  valorConteudo: {
    fontSize: 17,
    color: '#EB5B65'
  },
  localConteudo: {
    fontSize: 17
  },
  cabecalho: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cabecalhoTitulo: {
    fontSize: 18,
    marginTop: 10
  },
  produtos: {
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd'
  },
  relacaoProdutos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingHorizontal: 5
  },
  detalhesProduto: {
    fontSize: 16
  },
  botoes: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20
  }
});

export default GerenciaPedido;