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
  Alert,
} from 'react-native';

import Modal from 'react-native-modal';
import styleInput from '../Components/Input';
import ButtonRed from '../Components/ButtonRed';
import ButtonGreen from '../Components/ButtonGreen';
import url from '../services/url';

class CadProdutor extends Component {

  constructor() {
    super();
    this.state = {
      nome: '',
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
        return;
      }
      dadosPreenchidos.push(obj[key]);
    }

    if(this.state.senha !== this.state.senhaC) {
      Alert.alert('Campo senha', 'Confirme novamente a sua senha.')
      return;
    }

    if(this.state.uf.length > 2) {
      Alert.alert('Campo UF', 'Digite apenas as iniciais do seu estado.')
      return;
    }

    if(this.state.telefone.length > 9) {
      Alert.alert('Campo Telefone', 'Digite apenas nove números.')
      return;
    }

    if (dadosPreenchidos.length != 14)  
      return;

    console.log('Enviando requisição');
    this.enviaDados();

  }

  enviaDados() {

    const dados = this.state;
    delete dados['isVisible'];
    delete dados['senhaC'];

    dados.urlImagem = `https://api.adorable.io/avatars/150/${this.state.usuario}`;   
    console.log(`Dados sendo enviados: ${JSON.stringify(dados)}`) 

    fetch(`${url}create/produtor`, {
      method: 'POST',
      body: JSON.stringify(dados),
      headers: {'Content-type': 'application/json'}
    })
    .then(res => res.json())
    .then(res =>{
      console.log('Requisição Finalizada');
      Alert.alert('Sucesso!', 'Faça login no app.')
      this.props.navigation.navigate('Login');
    })
    .catch(e => console.log(e));
  }

  validaCep(cep) {

    fetch(`http://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(res => {
        if(res.erro)
          this.setState({isVisible: true, cep: ''});
      })
      .catch(e => console.log(e));

  }

  render() {

    return (
      <ImageBackground source={require('../img/bg.png')}
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

      <View style={styles.container}>

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
            placeholder="Ex: 99999999"
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
              this.setState({sexo: itemValue})
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
            onBlur={() => {this.validaCep(this.state.cep)}}
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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