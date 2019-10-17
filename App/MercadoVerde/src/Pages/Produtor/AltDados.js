import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput, AsyncStorage, Picker } from 'react-native';

import HeaderLogged from '../../Components/HeaderLogged';
import ButtonGreen from '../../Components/ButtonGreen';
import InputStyle from '../../Components/Input';

class AltDados extends Component {

  constructor() {
    super(),
      this.state = {
        valorEntrega: '',
        locais: '',
        nomeProduto: '',
        valorProduto: '',
        // kg ou und
        peso: '',
        qtdeProduto: '',
        //qual icone a ser renderizado, valor vindo de um select
        icone: ''
      }
    /* this.buscaDados() */
  }

  buscaDados() {

    AsyncStorage.getItem('id')
      .then(id => {

        fetch('http://10.59.128.133:1337/read/usuario', {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(res => {
            this.setState({
              valorEntrega: res[0].valorEntrega,
              locais: res[0].locais
            });
          })

      })
  }

  atualizar(that) {

    const url = '';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify( that.state ),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].status) {
        Alert.alert('Sucesso', 'Dados atualizados.')
      }
    })
    .catch(e => Alert.alert('Erro', 'Tente novamente.'))
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
                <Text style={styles.valorAtual}>Valor atual</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View>
                <Text style={styles.titulo}>Locais de Atendimento</Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Locais:</Text>
                <TextInput
                  keyboardType="default"
                  placeholder="Digite separado por vírgulas"
                  style={InputStyle}
                  onChangeText={input => this.state.locais = input}
                />
              </View>
              <View style={styles.containerLocais}>
                <Text style={styles.labelLocais}>Locais Atuais:</Text>
                <Text style={styles.locaisAtual}>{this.state.locais}</Text>
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
                selectedValue={this.state.peso}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ peso: itemValue })
                }}>

                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Kilogramas" value="KG" />
                <Picker.Item label="Unidades" value="UND" />

              </Picker>

              <Picker
                selectedValue={this.state.peso}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ peso: itemValue })
                }}>

                <Picker.Item label="Selecione icone para o produto" value="" />
                <Picker.Item label="Alface" value="alface" />
                <Picker.Item label="Abacaxi" value="abacaxi" />
                <Picker.Item label="Tomate" value="tomate" />

              </Picker>
            </View>

            <View style={styles.containerButton}>
                <TouchableOpacity onPress={() => this.atualizar(this)}>
                  <ButtonGreen title="Atualizar" />
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

export default AltDados;