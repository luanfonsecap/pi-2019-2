import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, ScrollView, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Rating, AirbnbRating, Overlay } from 'react-native-elements';
import url from '../../services/url';

import HeaderLogged from '../../Components/HeaderLogged';
import ButtonGreen from '../../Components/ButtonGreen';
import ButtonRed from '../../Components/ButtonRed';

const produtos = [
  { id: 1, nome: 'Tomate Cáqui', preco: 2.54, kg: 2, unidades: null, icon: 'tomate' },
  { id: 2, nome: 'Alface Americana', preco: 1.40, kg: null, unidades: 14, icon: 'alface' },
  { id: 3, nome: 'Abacaxi', preco: 3, kg: null, unidades: 9, icon: 'abacaxi' },
  { id: 4, nome: 'Limão', preco: 3, kg: null, unidades: 9, icon: 'limao' },
  { id: 5, nome: 'Laranja', preco: 2, kg: null, unidades: 3, icon: 'laranja' },
  { id: 6, nome: 'Morango', preco: 4, kg: null, unidades: 7, icon: 'morango' },
];

class MercadoProdutor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      nome: '',
      cidade: '',
      id: '',
      avaliacao: 0,
      url: '',
      produtos: [],
      sacola: []
    }

    AsyncStorage.getItem('id').then(id => this.setState({ id }));
  }

  componentDidMount() {

    this.getProdutos();
    this.getDados();
  }

  getDados() {

    let id = this.props.navigation.getParam('id');

    fetch(`${url}read/mercado`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          nome: res[0].nome,
          cidade: res[0].cidade,
          avaliacao: res[0].avaliacao,
          url: res[0].url
        });
        console.log(this.state);
      })

  }

  getProdutos() {

    let id = this.props.navigation.getParam('id');

    fetch(`${url}read/produto`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ produtos: res });
        console.log(this.state.produtos);
      })
  }

  carregaIcon(icon) {

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

  adcSacola(idProduto, idProdutor, valor, tipo, nome, kg, unidades) {

    const produto = {
      idCliente: this.state.id,
      idProduto,
      idProdutor,
      valor,
      tipo,
      nome,
      kg,
      unidades,
    }

    this.setState({sacola: [...this.state.sacola, produto]});
    global.sacolaGlobal.push(...this.state.sacola);
    console.log(this.state.sacola);
  }

  render() {
    return (
      <Fragment>
        
        <HeaderLogged />

        <ImageBackground source={require('../../img/bg.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <ScrollView>

            <View style={styles.cabecalho}>
              <View style={styles.row}>
                <Image style={styles.imgProdutor} source={{ uri: this.state.url }} />
                <View style={styles.infoMercado}>
                  <Text style={styles.mercado}>MERCADO</Text>
                  <Text style={styles.mercadoTitulo}>{this.state.nome}</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={this.state.avaliacao}
                    style={styles.rating}
                  />
                </View>
              </View>
              <View style={styles.localizacaoArea}>
                <Text style={styles.localizacao}>{this.state.cidade}</Text>
              </View>
            </View>
            <View style={styles.corpo}>
              <View style={styles.produtosArea}>
                <Text style={styles.produtosTitulo}>PRODUTOS</Text>
                <View style={styles.container}>

                  {
                    this.state.produtos.map(prod => {
                      return (
                        <View key={prod.id} style={styles.prodContainer}>
                          <View style={{ ...styles.areaImg, backgroundColor: this.fundoProduto(prod.icon) }}>
                            <Image style={styles.imgProd} source={this.carregaIcon(prod.icon)} />
                          </View>
                          <View style={styles.dadosProd}>
                            <Text style={styles.prodNome}>{prod.nome}</Text>
                            <Text style={styles.prodPreco}>R$ {prod.valor} {prod.unidades ? 'Und.' : 'Kg.'}</Text>
                          </View>
                          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.adcSacola(prod.id, prod.id_produtor, prod.valor, prod.tipo, prod.nome, prod.kg, prod.unidades)}>
                            <Image style={styles.cartProd} source={require('../../assets/add-to-cart.png')} />
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  }

                  <Overlay isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                  >
                    <View style={{ padding: 20 }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.imgProdutor} source={require('../../img/demo.png')} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 15 }}>José dos Tomates</Text>
                      </View>

                      <Text style={{ marginTop: 20, fontSize: 18, padding: 10 }}>Como foi sua experiência com esse produtor ?</Text>

                      <View style={{ margin: 40 }}>
                        <AirbnbRating
                          count={5}
                          reviews={["Péssima", "Ruim", "Boa", "Ótima", "Perfeita"]}
                          defaultRating={0}
                          size={30}
                          onFinishRating={() => {
                            /* envia avaliacao ao servidor */
                            setTimeout(() => {

                              Alert.alert('Sucesso!', 'Sua avaliação foi enviada.')
                              this.setState({ isVisible: false })
                            }, 1500);
                          }}
                        />

                        <View >
                          <TouchableOpacity style={{ marginTop: 100 }} onPress={() => this.setState({ isVisible: false })}>
                            <ButtonRed title="Cancelar" />
                          </TouchableOpacity>
                        </View>
                      </View>

                    </View>
                  </Overlay>

                  <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                    <ButtonGreen title="Avaliar Produtor" />
                  </TouchableOpacity>
                </View>

              </View>

            </View>

          </ScrollView>
        </ImageBackground>

      </Fragment>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingHorizontal: 30,
  },
  cabecalho: {
    backgroundColor: '#fff',
    borderBottomColor: '#dadada',
    borderBottomWidth: 2,
    padding: 20,
    elevation: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoMercado: {
    paddingHorizontal: 70
  },
  mercado: {
    fontWeight: 'bold',
    fontSize: 20
  },
  mercadoTitulo: {
    fontSize: 19
  },
  imgProdutor: {
    borderRadius: 50,
    width: 75,
    height: 75,
  },
  rating: {
    marginTop: 10
  },
  localizacao: {
    color: '#6EE39A',
    fontSize: 17,
    fontWeight: 'bold'
  },
  localizacaoArea: {
    marginTop: 15,
  },
  produtosArea: {
    height: '100%'
  },
  produtosTitulo: {
    fontSize: 20,
    color: '#6EE39A',
    fontWeight: 'bold',
    margin: 20
  },
  prodContainer: {
    margin: 15,
    flexDirection: 'row',
  },
  imgProd: {
    height: 40,
    resizeMode: 'contain',
  },
  areaImg: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#dadada'
  },
  cartProd: {
    height: 35,
    resizeMode: 'contain',
  },
  prodNome: {
    fontSize: 18
  },
  prodPreco: {
    fontSize: 17
  },
  dadosProd: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withNavigation(MercadoProdutor);