import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput, Text, ImageBackground, ScrollView, Picker, TouchableHighlight, Alert
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
      nome: null,
      usuario: null,
      email: null,
      telefone: null,
      sexo: null,
      cep: null,
      uf: null,
      cidade: null,
      rua: null,
      numero: null,
      bairro: null,
      senha: null,
      senhaC: null,
    }
  }

  /* o backend precisa validar quais dados foram enviados e alterar somente os mesmos no registro */
  enviaDados() {

    const dados = this.state;
    delete dados['senhaC'];

    fetch(`${url}/update/usuario`, {
      method: 'POST',
      body: JSON.stringify(dados),
      headers: {'Content-type': 'application/json'}
    })
    .then(res => console.log('Alteração concluída'))
    .catch(e => console.log(e));
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
                placeholder="Nome da sua feira"
                style={styleInput}
                onChangeText={input => this.state.nome = input}
                editable={true}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuário:</Text>
              <TextInput
                placeholder="Seu nome de usuário"
                style={styleInput}
                onChangeText={input => this.state.usuario = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                placeholder="Seu e-mail"
                style={styleInput}
                onChangeText={input => this.state.email = input}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                placeholder="9 digitos sem ífen"
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
                placeholder="Seu CEP"
                style={styleInput}
                onChangeText={input => this.state.cep = input}
                onBlur={() => { this.validaCep(this.state.cep) }}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>UF:</Text>
              <TextInput
                placeholder="Seu estado. Ex: MG, SP, RJ"
                style={styleInput}
                onChangeText={input => this.state.uf = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade:</Text>
              <TextInput
                placeholder="Sua cidade"
                style={styleInput}
                onChangeText={input => this.state.cidade = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rua:</Text>
              <TextInput
                placeholder="Sua rua"
                style={styleInput}
                onChangeText={input => this.state.rua = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>N°:</Text>
              <TextInput
                placeholder="Número da casa"
                style={styleInput}
                onChangeText={input => this.state.numero = input}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bairro:</Text>
              <TextInput
                placeholder="Seu bairro"
                style={styleInput}
                onChangeText={input => this.state.bairro = input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                placeholder="Sua senha"
                style={styleInput}
                onChangeText={input => this.state.senha = input}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Senha:</Text>
              <TextInput
                placeholder="Confirme sua senha"
                style={styleInput}
                onChangeText={input => this.state.senhaC = input}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.botoes}>
              <TouchableOpacity>
                <ButtonRed title="Cancelar" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.validaDados() }}>
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