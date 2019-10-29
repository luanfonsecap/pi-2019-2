import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, FlatList, ScrollView } from 'react-native';

const produtos = [
  { tipo: 'cenoura', id_produtor: 1 },
  { tipo: 'tomate', id_produtor: 2 },
  { tipo: 'kiwi', id_produtor: 3 },
  { tipo: 'abacate', id_produtor: 4 },
]

const avaliados = [
  { nome: 'José Dos Tomates', id: 1, avaliacao: 5, urlImagem: 'https://api.adorable.io/avatars/150/josedostomates' },
  { nome: 'João Abacate', id: 2, avaliacao: 4, urlImagem: 'https://api.adorable.io/avatars/150/joaoabacate' },
  { nome: 'Zé Das Couves', id: 3, avaliacao: 5, urlImagem: 'https://api.adorable.io/avatars/150/zedascouves' },
]

function iconeProduto(icon) {

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

function fundoProduto(tipo) {

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

function navegaMercado(id, navigation) {

  console.log('Navegando...');
  navigation.navigate('Home', { id });
}

/* Necessário fazer ajuste para que imagem do produtor seja renderizada] */

const Home = ({ navigation }) => {

  return (

    <View>
      <ImageBackground source={require('../../img/bg.png')}
        style={{ width: '100%', height: '100%' }}
      >

        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.titulo}>Mais populares</Text>

            <View style={styles.produtos}>

              {produtos.map(produto => {
                return (
                  <TouchableOpacity key={produto.id_produtor} onPress={() => navegaMercado(produto.id_produtor, navigation)}>
                    <View style={{ ...styles.produto, backgroundColor: fundoProduto(produto.tipo) }}>
                      <Image style={styles.produtoImagem} source={iconeProduto(produto.tipo)} />
                    </View>
                  </TouchableOpacity>
                );
              })}

            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.titulo}>Bem avaliados</Text>

            <FlatList
              data={avaliados}
              keyExtractor={avaliados.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.containerProdutor}>
                    <View style={styles.row}>
                      <Image style={styles.imgProdutor} source={item.urlImagem} />
                      <Text style={styles.nomeProdutor}>{item.nome}</Text>
                    </View>
                    <View style={styles.rowFooter}>
                      <Text style={styles.avaliacao}>Avaliação</Text>
                      <TouchableOpacity style={styles.btnProdutor} onPress={() => console.warn('Clicado!')}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
  },
  produto: {
    elevation: 3,
    padding: 10,
    marginTop: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5
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
  rowFooter: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  imgProdutor: {
    borderRadius: 50,
    margin: 5,
    borderColor: '#000',
    borderWidth: 1
  },
  nomeProdutor: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  avaliacao: {
    flex: 3,
  },
  btnProdutor: {
    backgroundColor: '#6EE39A',
    padding: 5,
    borderRadius: 5,
    flex: 1
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});

export default Home;