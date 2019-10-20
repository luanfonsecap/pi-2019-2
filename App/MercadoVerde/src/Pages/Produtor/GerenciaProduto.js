import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, AsyncStorage, FlatList, Image, TextInput, ScrollView, Picker } from 'react-native';

import HeaderLogged from '../../Components/HeaderLogged';
import ButtonGreen from '../../Components/ButtonGreen';
import ButtonRed from '../../Components/ButtonRed';
import InputStyle from '../../Components/Input';
import url from '../../services/url';

//simulação de dados vindos do servidor
const produtos = [
  { id: 1, nome: 'Tomate Cáqui', preco: 2.54, kg: 2, unidades: null, icon: 'tomate' },
  { id: 2, nome: 'Alface Americana', preco: 1.40, kg: null, unidades: 14, icon: 'alface' },
  { id: 3, nome: 'Abacaxi', preco: 3, kg: null, unidades: 9, icon: 'abacaxi' },
  { id: 4, nome: 'Limão', preco: 3, kg: null, unidades: 9, icon: 'limao' },
  { id: 5, nome: 'Laranja', preco: 2, kg: null, unidades: 3, icon: 'laranja' },
  { id: 6, nome: 'Morango', preco: 4, kg: null, unidades: 7, icon: 'morango' },
];

class GerenciaProduto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dados: [],
      nome: '',
      tipo: '',
      qtde: '',
      valor: '',
    }
  }

  componentDidMount() {

    AsyncStorage.getItem('id')
      .then(id => {
        console.log(id);
        this.buscaDados(id);
      })
  }

  //funcao para receber dados dos produtos relacionados ao produtor
  buscaDados(id) {

    fetch(`${url}read/produto`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.length == 0) {
          Alert.alert('OPS!', 'Você ainda não possui produtos cadastrados.')
        }
        this.setState({ dados: res });
      })
  }

  //renderiza icone do produto com base no tipo 
  /* necessário refatorar */
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

  removeProduto(id) {

    fetch(`${url}/delete/produto`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res[0].status) {
          Alert.alert('Sucesso', 'Produto removido.');
        } else {
          Alert.alert('Erro', 'Produto não foi removido.');
        }
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Erro', 'Houve um problema com o servidor, tente novamente.');
      })
  }

  atualizaProduto(id) {

    fetch(`${url}/update/produto`, {
      method: 'POST',
      body: JSON.stringify({ id, nome: this.state.nome, valor: this.state.valor, tipo: this.state.tipo, qtde: this.state.qtde }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res[0].status) {
          Alert.alert('Sucesso', 'Produto atualizado.');
        } else {
          Alert.alert('Erro', 'Produto não foi atualizado.');
        }
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Erro', 'Houve um problema com o servidor, tente novamente.');
      })
  }

  quantidade(kg, und) {
    if (kg) {
      return `${kg} Kg.`;
    } else {
      return `${und} Und.`;
    }
  }

  render() {

    return (
      <ImageBackground source={require('../../img/bg.png')}
        style={{ width: '100%', height: '100%' }}>
        <ScrollView>
          <View>
            <HeaderLogged />

            <FlatList
              data={this.state.dados}
              keyExtractor={produtos.id}
              renderItem={({ item }) => {
                return (

                  <View style={styles.container}>
                    <View>
                      <Image style={styles.imagem} source={this.carregaIcon(item.icon)} />
                      <Text style={styles.labelCabecalho}>{item.nome}</Text>
                      <Text style={styles.labelCabecalho}>R$ {item.preco}</Text>
                      <Text style={styles.labelCabecalho}>Qtde: {this.quantidade(item.kg, item.unidades)}</Text>
                    </View>
                    <View style={styles.form}>
                      <Text style={styles.label}>Nome:</Text>
                      <TextInput
                        placeholder="Nome do produto"
                        style={InputStyle}
                        onChangeText={input => this.state.nome = input}
                        keyboardType="default"
                      />
                      <Text style={styles.label}>Valor:</Text>
                      <TextInput
                        placeholder="Valor do produto"
                        style={InputStyle}
                        onChangeText={input => this.state.valor = input}
                        keyboardType="numeric"
                      />

                      <Text style={styles.label}>Quantidade:</Text>
                      <TextInput
                        placeholder="Qtde do produto"
                        style={InputStyle}
                        onChangeText={input => this.state.qtde = input}
                        keyboardType="numeric"
                      />

                      <Picker
                        selectedValue={this.state.peso}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({ peso: itemValue })
                        }}>

                        <Picker.Item label="Selecione o tipo de quantidade" value={null} />
                        <Picker.Item label="Quilogramas" value="kg" />
                        <Picker.Item label="Unidades" value="unidades" />

                      </Picker>
                    </View>

                    <View style={styles.botoes}>
                      <TouchableOpacity onPress={() => this.removeProduto(item.id)}>
                        <ButtonRed title="Remover" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.atualizaProduto(item.id)}>
                        <ButtonGreen title="Atualizar" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 5,
    margin: 20,
    padding: 15,
  },
  imagem: {
    alignSelf: 'center'
  },
  labelCabecalho: {
    margin: 5,
    fontSize: 18,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
  form: {
    padding: 10
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
});

export default GerenciaProduto;