import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput, Text, ImageBackground, ScrollView, Picker, TouchableHighlight, Alert, AsyncStorage
} from 'react-native';

import styleInput from '../../Components/Input';
import ButtonRed from '../../Components/ButtonRed';
import ButtonGreen from '../../Components/ButtonGreen';
import url from '../../services/url';
import HeaderLogged from '../../Components/HeaderLogged';

class AltDados extends Component {

  constructor() {
    super();
    this.state = {
      usuario: null,
      nome: null,
      email: null,
      telefone: null,
      sexo: null,
      cep: null,
      uf: null,
      cidade: null,
      rua: null,
      numero: null,
      bairro: null,
    }
  }

  componentDidMount() {
    this.buscaDados();
  }

  buscaDados() {
    
    AsyncStorage.getItem('id')
      .then(id => {

        fetch(`${url}read/usuario`, {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(res => {

          delete res[0]['id'];
          delete res[0]['tipo'];
          delete res[0]['urlImagem'];
          delete res[0]['senha'];
          delete res[0]['senhaC'];
          delete res[0]['areas'];

          this.setState({...res[0]});
          console.log(this.state);
        })
      })
  }

  enviaDados() {

    const dados = this.state;

    AsyncStorage.getItem('id')
      .then(id => {

        dados.id = id;
        console.log(dados);

        fetch(`${url}update/produtor`, {
          method: 'POST',
          body: JSON.stringify(dados),
          headers: {'Content-type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
          Alert.alert('Sucesso', 'Informações alteradas!')
          this.props.navigation.navigate('IndexP');
        })
        .catch(e => console.log(e));
      })
  }

  render() {
    return (
      <ImageBackground source={require('../../img/bg.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollView>
          <HeaderLogged />


          <View style={styles.container}>

            <Text style={styles.titulo}>Altere seus dados</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Feira:</Text>
              <TextInput
                placeholder={this.state.nome}
                style={styleInput}
                onChangeText={input => this.state.nome = input}
                editable={true}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuário:</Text>
              <TextInput
                placeholder={this.state.usuario}
                style={styleInput}
                onChangeText={input => this.state.usuario = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                placeholder={this.state.email}
                style={styleInput}
                onChangeText={input => this.state.email = input}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                placeholder={`${this.state.telefone}`}
                style={styleInput}
                onChangeText={input => this.state.telefone = input}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sexo:</Text>
              <Picker
                selectedValue={this.state.sexo}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ sexo: itemValue })
                }}>

                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Feminino" value="F" />
                <Picker.Item label="Não Declarado" value="N" />

              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CEP:</Text>
              <TextInput
                placeholder={`${this.state.cep}`}
                style={styleInput}
                onChangeText={input => this.state.cep = input}
                onBlur={() => { this.validaCep(this.state.cep) }}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>UF:</Text>
              <TextInput
                placeholder={this.state.uf}
                style={styleInput}
                onChangeText={input => this.state.uf = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade:</Text>
              <TextInput
                placeholder={this.state.cidade}
                style={styleInput}
                onChangeText={input => this.state.cidade = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rua:</Text>
              <TextInput
                placeholder={this.state.rua}
                style={styleInput}
                onChangeText={input => this.state.rua = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>N°:</Text>
              <TextInput
                placeholder={`${this.state.numero}`}
                style={styleInput}
                onChangeText={input => this.state.numero = input}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bairro:</Text>
              <TextInput
                placeholder={this.state.bairro}
                style={styleInput}
                onChangeText={input => this.state.bairro = input}
              />
            </View>

            <View style={styles.botoes}>
              <TouchableOpacity>
                <ButtonRed title="Cancelar" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.enviaDados() }}>
                <ButtonGreen title="Alterar" />
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>

      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  titulo: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 5,
    borderRadius: 3,
    color: '#EB5B65'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputGroup: {
    marginTop: 5,
  },
  botoes: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#707070',
    borderWidth: 1,
    elevation: 1,
    width: 250,
    height: 35,
    padding: 0,
    paddingLeft: 5
  }
});

export default AltDados;