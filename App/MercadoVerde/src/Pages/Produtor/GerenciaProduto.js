import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, AsyncStorage, FlatList, Image, TextInput, ScrollView } from 'react-native';

import HeaderLogged from '../../Components/HeaderLogged';
import ButtonGreen from '../../Components/ButtonGreen';
import ButtonRed from '../../Components/ButtonRed';
import InputStyle from '../../Components/Input';

//simulação de dados vindos do servidor
const produtos = [
  { id: 1, nome: 'Tomate Cáqui', preco: 2.54, kg: 2, und: null, icon: 'tomate' },
  { id: 2, nome: 'Alface Americana', preco: 1.40, kg: null, und: 14, icon: 'alface' },
  { id: 3, nome: 'Abacaxi', preco: 3, kg: null, und: 9, icon: 'abacaxi' },
];

class GerenciaProduto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dados: [],
      nome: '',
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

  //funcao para receber dados dos produtos cadastrados no servidor
  buscaDados(id) {

    const url = 'http://192.168.100.19:1337/read/produto'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({dados: res});
        console.log(this.state.dados);
      })
  }

  //renderiza icone do produto com base no tipo 
  carregaIcon(icon) {

    switch (icon) {
      case 'tomate':
        return require('../../img/tomato.png');
        break;

      case 'abacaxi':
        return require('../../img/pineapple.png');
        break;

      case 'alface':
        return require('../../img/lettuce.png');
        break;

      default:
        return require('../../img/no-image.png');
        break;
    }
  }

  removeProduto(id) {

    const url = 'http://192.168.100.19:1337/delete/produto';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].status) {
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

    const url = 'http://192.168.100.19:1337/update/produto'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(
        { id, nome: this.state.nome, valor: this.state.valor, qtde: this.state.qtde  }
      ),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].status) {
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
    if(kg) {
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

                  /* Necessário criar um select para que o produtor escolha o tipo de icone
                  para seu produto será usado, com base em uma lista predefinida do select e imagens
                  já disponibilizadas dentro do app em "img", assim facilitando para renderizar a imagem certa
                  no lado do usuário Cliente */

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
                        onChangeText={input => this.state.nome = input }
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