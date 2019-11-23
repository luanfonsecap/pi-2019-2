import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput, AsyncStorage, Picker } from 'react-native';

import HeaderLogged from '../../Components/HeaderLogged';
import ButtonRed from '../../Components/ButtonRed';
import ButtonGreen from '../../Components/ButtonGreen';
import InputStyle from '../../Components/Input';
import url from '../../services/url';

class Mercado extends Component {

  constructor() {
    super(),
      this.state = {
        valorEntrega: '',
        nomeProduto: '',
        valorProduto: '',
        // kg ou und
        tipo: '',
        qtdeProduto: '',
        //qual icone a ser renderizado, valor vindo de um select
        icone: '',
        //id do produtor
        id: ''
      }
  }

  async componentDidMount() {

    await AsyncStorage.getItem('id')
      .then(id => this.setState({ id }))
      .catch(e => Alert.alert('Erro', 'Ocorreu um erro, reinicie o aplicativo'));

    const id = this.state.id;

    fetch(`${url}read/usuario`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          valorEntrega: res[0].taxa,
        });
      })
      .catch(e => console.log(e));

  }

  cancelar(that) {

    that.setState({
      valorEntrega: '',
      nomeProduto: '',
      valorProduto: '',
      peso: '',
      qtdeProduto: '',
      icone: ''
    });

    that.props.navigation.navigate('IndexP');
  }

  cadProduto(that) {

    if (!that.state.icone) {
      Alert.alert('Ops!', 'Você esqueceu de adicionar o icone do produto.');
      return;
    }

    fetch(`${url}create/produto`, {
      method: 'POST',
      body: JSON.stringify({
        nome: that.state.nomeProduto,
        valor: that.state.valorProduto,
        id_produtor: that.state.id,
        qtde: that.state.qtdeProduto,
        tipo: that.state.tipo,
        icon: that.state.icone
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res[0].status) {
          Alert.alert(`Sucesso!`, `${res[0].msg}`);
          that.setState({
            nomeProduto: '',
            valorProduto: '',
            peso: '',
            qtdeProduto: '',
            icone: ''
          });
        }
      });
  }

  altTaxa(that) {

    fetch(`${url}update/taxa`, {
      method: 'POST',
      body: JSON.stringify({
        id: that.state.id,
        valorTaxa: that.state.valorEntrega
      }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        Alert.alert('Sucesso!', 'Valor da entrega alterado.');
        that.setState({ valorEntrega: '' });
      })

  }

  render() {
    return (
      <ImageBackground source={require('../../img/bg.png')}
        style={{ height: '100%', height: '100%' }}>
        <ScrollView>
          <View>
            <HeaderLogged />

            <View style={styles.card}>
              <View>
                <Text style={styles.titulo}>Taxa de Entrega</Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Valor:</Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Digite o novo valor"
                  style={InputStyle}
                  onChangeText={input => this.state.valorEntrega = input}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Atual:</Text>
                <Text style={styles.valorAtual}>{this.state.valorEntrega}</Text>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity onPress={() => this.altTaxa(this)}>
                  <ButtonGreen title="Alterar" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.titulo}>Cadastrar Produto</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                keyboardType="default"
                placeholder="Digite o nome do produto"
                style={InputStyle}
                onChangeText={input => this.state.nomeProduto = input}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Valor:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Digite o valor do produto"
                style={InputStyle}
                onChangeText={input => this.state.valorProduto = input}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Qtde:</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Digite a quantidade"
                style={InputStyle}
                onChangeText={input => this.state.qtdeProduto = input}
              />
            </View>
            <Picker
              selectedValue={this.state.tipo}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ tipo: itemValue })
              }}>

              <Picker.Item label="Selecione o tipo de quantidade" value="" />
              <Picker.Item label="Quilogramas" value="kg" />
              <Picker.Item label="Unidades" value="unidades" />

            </Picker>

            <Picker
              selectedValue={this.state.icone}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ icone: itemValue });
              }}>

              <Picker.Item label="Selecione icone para o produto" value="" />
              <Picker.Item label="Sem icone" value="undefined" />
              <Picker.Item label="Alface" value="alface" />
              <Picker.Item label="Abacaxi" value="abacaxi" />
              <Picker.Item label="Tomate" value="tomate" />
              <Picker.Item label="Feijão" value="feijao" />
              <Picker.Item label="Kiwi" value="kiwi" />
              <Picker.Item label="Maça" value="maca" />
              <Picker.Item label="Banana" value="banana" />
              <Picker.Item label="Repolho" value="repolho" />
              <Picker.Item label="Cenoura" value="cenoura" />
              <Picker.Item label="Limão" value="limao" />
              <Picker.Item label="Uvas" value="uva" />

            </Picker>

            <View style={styles.containerButton}>
              <TouchableOpacity onPress={() => this.cadProduto(this)}>
                <ButtonGreen title="Cadastrar" />
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 5
  },
  titulo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  label: {
    fontSize: 17
  },
  labelLocais: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center'
  },
  containerLocais: {
    marginTop: 15,
    alignItems: 'center'
  },
  locaisAtual: {
    fontSize: 17,
    marginRight: 10,
    padding: 15,
  },
  peso: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
    alignItems: 'center'
  }
});

export default Mercado;