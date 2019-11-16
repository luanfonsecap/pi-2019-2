import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, AsyncStorage } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Overlay, AirbnbRating } from 'react-native-elements';
import url from '../../services/url';
import HeaderLogged from '../../Components/HeaderLogged';
import ButtonGreen from '../../Components/ButtonGreen';
import ButtonRed from '../../Components/ButtonRed';

class Pedidos extends Component {

  constructor() {
    super();
    this.state = {
      lista: [],
      id: null,
      isVisible: false,
      nomeProdutor: null,
      pedidoSelecionado: null,
      idProdutor: null
    }
  }

  async componentDidMount() {

    await AsyncStorage.getItem('id').then(id => this.setState({ id }));

    fetch(`${url}read/historico`, {
      method: 'POST',
      body: JSON.stringify({ id: 2, status: 'Aguardando' }),
      headers: { 'Content-type': 'application/json' }
    }).then(res => res.json())
      .then(lista => this.setState({ lista }))
      .catch(e => {
        console.log(e);
        Alert.alert('Erro', 'Erro ao conectar com servidor!');
      })
  }

  async avaliacao(idProdutor, idCompra) {

    await fetch(`${url}read/mercado`, {
      method: 'POST',
      body: JSON.stringify({ id: idProdutor }),
      headers: { 'Content-type': 'application/json' }
    }).then(res => res.json())
      .then(res => {
        this.setState({ nomeProdutor: res[0].nome });
        this.setState({ isVisible: true, pedidoSelecionado: idCompra, idProdutor });
      })

  }

  avaliado(rating) {

    fetch(`${url}create/avaliacao`, {
      method: 'POST',
      body: JSON.stringify({
        id_pedido: this.state.pedidoSelecionado,
        nome_produtor: this.state.nomeProdutor,
        id_produtor: this.state.idProdutor,
        estrelas: parseInt(rating)
      }),
      headers: { 'Content-type': 'application/json' }
    })

    setTimeout(() => {

      Alert.alert('Sucesso!', 'Sua avaliação foi enviada.')
      this.setState({ isVisible: false })
    }, 1500);
  }

  render() {
    return (
      <Fragment>
        <HeaderLogged />
        <ImageBackground source={require('../../img/bg.png')}
          style={{ width: '100%', height: '100%' }}
        >

          <Text style={styles.titulo}>Histórico de Pedidos</Text>

          <FlatList
            data={this.state.lista}
            keyExtractor={this.state.lista.IdCompra}
            renderItem={({ item }) => {
              return (
                <View style={styles.container}>
                  <Text style={styles.id}>Id da compra: {item.IdCompra}</Text>
                  <Text style={styles.produtos}>Produtos:</Text>
                  <View>
                    <Text style={styles.produto}>{item.Produtos}</Text>
                  </View>
                  <Text style={styles.valor}>Valor da compra: <Text style={styles.preco}>{item.Valor}</Text></Text>
                  <TouchableOpacity onPress={() => this.avaliacao(item.IdProdutor, item.IdCompra)} style={styles.avaliar}>
                    <ButtonGreen title="Avaliar" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <Overlay isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
          >
            <View style={{ padding: 20 }}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ borderRadius: 50, width: 75, height: 75 }} source={require('../../img/demo.png')} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 15 }}>{this.state.nomeProdutor}</Text>
              </View>

              <Text style={{ marginTop: 20, fontSize: 18, padding: 10 }}>Como foi sua experiência com esse produtor ?</Text>

              <View style={{ margin: 40 }}>
                <AirbnbRating
                  count={5}
                  reviews={["Péssima", "Ruim", "Boa", "Ótima", "Perfeita"]}
                  defaultRating={0}
                  size={30}
                  onFinishRating={this.avaliado.bind(this)}
                />

                <View >
                  <TouchableOpacity style={{ marginTop: 50 }} onPress={() => this.setState({ isVisible: false })}>
                    <ButtonRed title="Cancelar" />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </Overlay>

        </ImageBackground>
      </Fragment>
    );
  }

}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    alignSelf: 'center'
  },
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center'
  },
  id: {
    margin: 2,
    fontSize: 17
  },
  produtos: {
    margin: 2,
    fontSize: 17
  },
  produto: {
    margin: 2,
    fontSize: 17,
    marginLeft: 15
  },
  valor: {
    margin: 2,
    fontSize: 17
  },
  preco: {
    color: '#EB5B65'
  },
  avaliar: {
    marginTop: 10,
    width: '50%'
  }
});

export default Pedidos;