import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ImageBackground,
  ScrollView,
  Picker,
  TouchableHighlight,
  Alert
} from 'react-native';

import Modal from 'react-native-modal';
import Header from '../Components/Header';
import styleInput from '../Components/Input';
import ButtonRed from '../Components/ButtonRed';
import ButtonGreen from '../Components/ButtonGreen';

class CadProdutor extends Component {

  constructor() {
    super();
    this.state = {
      feira: '',
      usuario: '',
      email: '',
      telefone: '',
      sexo: '',
      cep: '',
      uf: '',
      cidade: '',
      rua: '',
      numero: '',
      bairro: '',
      senha: '',
      senhaC: '',
      isVisible: false
    }
  }

  validaDados() {

    const obj = this.state;

    let dadosPreenchidos = [];

    for(var key in obj) {
      if(obj[key] === '') {
        Alert.alert('Erro', `Preencha o campo ${key}.`);
      }
      dadosPreenchidos.push(obj[key]);
    }

    if (dadosPreenchidos.length != 14)  
      return;

    this.enviaDados(dadosPreenchidos);

  }

  enviaDados(data) {

    const dados = this.state;
    delete dados['isVisible'];

    const uri = '';
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(dados)
    })
    .then(res => console.log(res.json()))
    .catch(e => {
      console.log(e.json());
    });'' 
  }

  validaCep(cep) {

    fetch(`http://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(res => {
        if(res.erro)
          this.setState({isVisible: true});
      })
      .catch(e => console.log(e));

  }

  render() {

    return (
      <ImageBackground source={require('../img/bg-fruits-blur.png')}
        style={{ width: '100%', height: '100%' }}
      >

        <Modal isVisible={this.state.isVisible} hasBackdrop={true} backdropColor='black' onBackdropPress={() => {this.setState({isVisible: false})}}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.modal}>
              O CEP digitado é inválido!
            </Text>
            <TouchableHighlight style={{alignSelf: 'center', marginTop: 15}}
              onPress={() => {this.setState({isVisible: false})}}>
              <ButtonRed title="Voltar" />
            </TouchableHighlight>
          </View>
        </Modal>

      <ScrollView>      
      <Header />

      <View style={styles.container}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome da Feira:</Text>
          <TextInput
            placeholder="Nome da sua feira"
            style={styleInput}
            onChangeText={input => this.state.feira = input}
            ref={input => this.inputFeira = input}
            editable={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Usuário:</Text>
          <TextInput
            placeholder="Seu nome de usuário"
            style={styleInput}
            onChangeText={input => this.state.usuario = input}
            ref={input => this.inputUsuario = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder="Seu e-mail"
            style={styleInput}
            onChangeText={input => this.state.email = input}
            ref={input => this.inputEmail = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            placeholder="Seu telefone"
            style={styleInput}
            onChangeText={input => this.state.telefone = input}
            ref={input => this.inputTelefone = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sexo:</Text>
          <Picker 
            selectedValue={this.state.sexo}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({sexo: itemValue})
            }}>
            
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Masculino" value="M" />
            <Picker.Item label="Femenino" value="F" />

          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CEP:</Text>
          <TextInput
            placeholder="Seu CEP"
            style={styleInput}
            onChangeText={input => this.state.cep = input}
            onBlur={() => {this.validaCep(this.state.cep)}}
            ref={input => this.inputCep = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>UF:</Text>
          <TextInput
            placeholder="Seu estado"
            style={styleInput}
            onChangeText={input => this.state.uf = input}
            ref={input => this.inputUF = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            placeholder="Sua cidade"
            style={styleInput}
            onChangeText={input => this.state.cidade = input}
            ref={input => this.inputCidade = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rua:</Text>
          <TextInput
            placeholder="Sua rua"
            style={styleInput}
            onChangeText={input => this.state.rua = input}
            ref={input => this.inputRua = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>N°:</Text>
          <TextInput
            placeholder="Número da casa"
            style={styleInput}
            onChangeText={input => this.state.numero = input}
            ref={input => this.inputNumero = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            placeholder="Seu bairro"
            style={styleInput}
            onChangeText={input => this.state.bairro = input}
            ref={input => this.inputBairro = input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            placeholder="Sua senha"
            style={styleInput}
            onChangeText={input => this.state.senha = input}
            ref={input => this.inputSenha = input}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha:</Text>
          <TextInput
            placeholder="Confirme sua senha"
            style={styleInput}
            onChangeText={input => this.state.senhaC = input}
            ref={input => this.inputSenhaC = input}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.botoes}>
          <TouchableOpacity>
            <ButtonRed title="Cancelar"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.validaDados()}}>
            <ButtonGreen title="Concluir"/>
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
    marginTop: 40,
    padding: 30
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
    alignContent: 'space-around',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
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
  },
  modal: {
    padding: 50,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    color: 'red'
  }
});

export default CadProdutor;