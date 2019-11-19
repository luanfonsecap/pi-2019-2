import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, AsyncStorage } from 'react-native';
import HeaderLogged from '../../Components/HeaderLogged';
import ButtonRed from '../../Components/ButtonRed';
import { Icon } from 'native-base';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import url from '../../services/url';

class Carrinho extends Component {

  constructor() {
    super();
    this.state = {
      sacola: global.sacolaGlobal,
      id: null,
      nome: null,
      cidade: null,
    }
  }

  async componentDidMount() {

    await AsyncStorage.getItem('id').then(id => {
      this.setState({ id });
    });
    await AsyncStorage.getItem('nome').then(nome => {
      this.setState({ nome });
    });
    await AsyncStorage.getItem('cidade').then(cidade => {
      this.setState({ cidade });
    });
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

  async removeProduto(id) {

    console.log(id);
    let sacolaAtual = this.state.sacola;

    const sacolaAtualizada = sacolaAtual.filter(prod => {
      return prod.idProduto !== id
    });

    console.log(sacolaAtualizada);
    await this.setState({ sacola: sacolaAtualizada });
    global.sacolaGlobal = this.state.sacola;
  }

  async enviarPedido() {

    const produtosId = this.state.sacola.map(prod => {
      return prod.idProduto;
    });
    let stringIds = '';
    produtosId.forEach(id => {
      stringIds = stringIds + `${id},`
    });
    stringIds = stringIds.substr(0, (stringIds.length - 1));

    const valorProdutos = this.state.sacola.map(prod => {
      return prod.valor;
    });
    let stringValores = '';
    valorProdutos.forEach(valor => {
      stringValores = stringValores + `${valor},`
    });
    stringValores = stringValores.substr(0, (stringValores.length - 1));

    const tipos = this.state.sacola.map(prod => {
      return prod.tipo;
    });
    let stringTipos = '';
    tipos.forEach(tipo => {
      stringTipos = stringTipos + `${tipo},`
    });
    stringTipos = stringTipos.substr(0, (stringTipos.length - 1));

    const qtde = this.state.sacola.map(prod => {
      return prod.qtde;
    });
    let stringQtde = '';
    qtde.forEach(qtde => {
      stringQtde = stringQtde + `${qtde},`
    });
    stringQtde = stringQtde.substr(0, (stringQtde.length - 1));


    await fetch(`${url}create/pedido`, {
      method: 'POST',
      body: JSON.stringify({
        id_produtor: this.state.sacola[0].idProdutor,
        id_cliente: this.state.id,
        nome_cliente: this.state.nome,
        cidade: this.state.cidade,
        produtos: stringIds,
        valor: stringValores,
        tipo: stringTipos,
        qtde: stringQtde
      }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          Alert.alert('Sucesso!', 'Pedido enviado ao produtor.');
          this.setState({ sacola: [] });
          global.sacolaGlobal = [];
        } else {
          Alert.alert('Falha!', 'Pedido não foi enviado ao produtor.');
        }
        console.log(res);
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Erro!', 'Erro no servidor, tente mais tarde.');
      })

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

          <ScrollView>
            <Text style={styles.tituloSacola}>Selecionados:</Text>

            <View style={styles.listProds}>
              <FlatList
                data={this.state.sacola}
                keyExtractor={this.state.sacola.id}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.prodContainer}>
                      <View style={{ ...styles.areaImg, backgroundColor: this.fundoProduto(item.tipo) }}>
                        <Image style={styles.imgProd} source={this.carregaIcon(item.tipo)} />
                      </View>
                      <View style={styles.column}>
                        <Text style={styles.prodNome}>{item.nome}</Text>
                        <Text style={styles.prodPreco}>R$ {item.valor}</Text>
                        <Text style={styles.prodPreco}>Qtde: {item.qtde}</Text>
                      </View>
                      <TouchableOpacity onPress={() => this.removeProduto(item.idProduto)} style={styles.prodRemover}>
                        <Icon style={styles.remover} type="Feather" name="x-circle" />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>

            <TouchableOpacity onPress={this.enviarPedido.bind(this)} style={styles.fecharSacola}>
              <ButtonRed title="Fechar Sacola" />
            </TouchableOpacity>
          </ScrollView>
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
  tituloSacola: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    margin: 10
  },
  listProds: {
    backgroundColor: '#fff',
    margin: 25,
    elevation: 5,
    borderRadius: 5
  },
  prodContainer: {
    marginVertical: 15,
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  areaImg: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#dadada'
  },
  imgProd: {
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 10
  },
  prodNome: {
    fontSize: 17
  },
  prodPreco: {
    fontSize: 16
  },
  column: {
    flexDirection: 'column'
  },
  remover: {
    color: '#F06A6A',
  },
  fecharSacola: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20
  }
});

export default Carrinho;