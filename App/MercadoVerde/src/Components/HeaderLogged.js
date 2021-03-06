import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';

class HeaderLogged extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null,
      nome: ''
    }
  }

  componentDidMount() {

    AsyncStorage.getItem('nome')
      .then(nome => this.setState({ nome: nome }));
    AsyncStorage.getItem('url')
      .then(url => this.setState({ url: url }));
  }

  render() {

    return (
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: this.state.url }} />
        <Text style={styles.nome}>{this.state.nome}</Text>

        <TouchableOpacity style={styles.botaoSair}
          onPress={() => {
            AsyncStorage.clear()
              .then(res => this.props.navigation.navigate('Home'));
          }}>
          <View>
            <Text style={styles.textoBotao}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00BA51',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nome: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  img: {
    borderRadius: 50,
    width: 70,
    height: 70,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000'
  },
  botaoSair: {
    backgroundColor: '#00BA51',
    alignSelf: 'center'
  },
  textoBotao: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    paddingHorizontal: 15,
    padding: 5,
    margin: 15
  }
});

export default withNavigation(HeaderLogged);