import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { Rating } from 'react-native-elements';
import { Header, Footer, FooterTab, Button, Icon, Badge, Container } from 'native-base';

import TabNavigator from '../../Components/TabNavigator';
import HeaderLogged from '../../Components/HeaderLogged';

import url from '../../services/url';

/* const produtos = [
  { tipo: 'cenoura', id_produtor: 1 },
  { tipo: 'tomate', id_produtor: 2 },
  { tipo: 'kiwi', id_produtor: 3 },
  { tipo: 'abacate', id_produtor: 4 },
]

const avaliados = [
  { nome: 'José Dos Tomates', id: 1, avaliacao: 5, urlImagem: 'https://api.adorable.io/avatars/150/josedostomates' },
  { nome: 'João Abacate', id: 2, avaliacao: 4, urlImagem: 'https://api.adorable.io/avatars/150/joaoabacate' },
  { nome: 'Zé Das Couves', id: 3, avaliacao: 5, urlImagem: 'https://api.adorable.io/avatars/150/zedascouves' },
] */

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      avaliados: [],
    }
  }

  componentDidMount() {
    this.getProdutos();
    this.getAvaliados();
    global.sacolaGlobal = [];
  }

  iconeProduto(icon) {

    switch (icon) {
      case 'tomate':
        return require('../../assets/tomato.png');
        break;

      case 'abacaxi':
        return require('../../assets/pineapple.png');
        break;

      case 'alface':
        return require('../../assets/lettuce.png');
        break;

      case 'abacate':
        return require('../../assets/avocado.png');
        break;

      case 'banana':
        return require('../../assets/bananas.png');
        break;

      case 'cenoura':
        return require('../../assets/carrot.png');
        break;

      case 'uva':
        return require('../../assets/grapes.png');
        break;

      case 'kiwi':
        return require('../../assets/kiwi.png');
        break;

      case 'limao':
        return require('../../assets/lime.png');
        break;

      case 'laranja':
        return require('../../assets/orange.png');
        break;

      case 'maça':
        return require('../../assets/apple.png');
        break;

      case 'melancia':
        return require('../../assets/watermelon.png');
        break;

      case 'morango':
        return require('../../assets/strawberry.png');
        break;

      case 'pimenta':
        return require('../../assets/chili.png');
        break;

      case 'feijao':
        return require('../../assets/beans.png');
        break;

      default:
        return require('../../assets/no-image.png');
        break;
    }
  }

  fundoProduto(tipo) {

    switch (tipo) {
      case 'tomate':
        return '#F06A6A';
        break;

      case 'abacaxi':
        return '#E5F044';
        break;

      case 'alface':
        return '#90C48C';
        break;

      case 'abacate':
        return '#90C48C';
        break;

      case 'banana':
        return '#E5F044';
        break;

      case 'cenoura':
        return '#F1C07E';
        break;

      case 'uva':
        return '#AB60CC';
        break;

      case 'kiwi':
        return '#90C48C';
        break;

      case 'limao':
        return '#90C48C';
        break;

      case 'laranja':
        return '#F1C07E';
        break;

      case 'maça':
        return '#F06A6A';
        break;

      case 'melancia':
        return '#D9D1D1';
        break;

      case 'morango':
        return '#F06A6A';
        break;

      case 'pimenta':
        return '#F06A6A';
        break;

      case 'feijao':
        return '#CEC063';
        break;

      default:
        return 'white';
        break;
    }
  }

  navegaMercado(id) {

    this.props.navigation.navigate('MercadoProdutor', { id });
  }

  getProdutos() {

    fetch(`${url}read/produtosdestaque`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => this.setState({ produtos: res }))
      .catch(e => console.log(e));
  }

  getAvaliados() {

    AsyncStorage.getItem('cidade')
      .then(cidade => {
        fetch(`${url}read/melhores`, {
          method: 'POST',
          body: JSON.stringify({ cidade }),
          headers: { 'Content-type': 'application/json' }
        })
          .then(res => res.json())
          .then(res => {
            this.setState({ avaliados: res });
          })
          .catch(e => console.log(e));
      })

  }

  render() {

    return (

      <Fragment>
        <ImageBackground source={require('../../img/bg.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <Header androidStatusBarColor="#00BA51" style={{ display: 'none' }}></Header>
          <HeaderLogged />


          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.titulo}>Mais populares</Text>

              <View style={styles.produtos}>

                {this.state.produtos.map(produto => {
                  return (
                    <TouchableOpacity key={produto.id} onPress={() => this.navegaMercado(produto.id_produtor)}>
                      <View style={{ ...styles.produto, backgroundColor: this.fundoProduto(produto.tipo) }}>
                        <Text style={{ alignSelf: 'center', color: '#fff', marginBottom: 5, }}>{produto.nome}</Text>
                        <Image style={styles.produtoImagem} source={this.iconeProduto(produto.tipo)} />
                      </View>
                    </TouchableOpacity>
                  );
                })}

              </View>
            </View>

            <View style={styles.container}>
              <Text style={styles.titulo}>Melhores da sua região</Text>

              <FlatList
                data={this.state.avaliados}
                keyExtractor={this.state.avaliados.id}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.containerProdutor}>
                      <View style={styles.row}>
                        <Image style={styles.imgProdutor} source={require('../../assets/groceries.png')} />
                        <Text style={styles.nomeProdutor}>{item.nome}</Text>
                      </View>
                      <View style={styles.rowFooter}>
                        <Rating
                          imageSize={20}
                          readonly
                          startingValue={item.avaliacao}
                        />
                        <TouchableOpacity style={styles.btnProdutor} onPress={() => this.navegaMercado(item.id)}>
                          <Text style={styles.textBtn}>Ver</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>

        </ImageBackground>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#64BE67',
  },
  produtos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 15
  },
  produtoImagem: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  produto: {
    elevation: 3,
    padding: 10,
    marginTop: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: 175,
  },
  containerProdutor: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    borderColor: '#000',
    borderWidth: .5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  imgProdutor: {
    height: 50,
    resizeMode: 'contain'
  },
  nomeProdutor: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  rowFooter: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnProdutor: {
    backgroundColor: '#6EE39A',
    padding: 5,
    borderRadius: 5,
    width: 100
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});

export default Home;