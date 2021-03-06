import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { StyleSheet } from 'react-native';

import Home from './Home';
export default class FooterTabsBadgeExample extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Home navigation={this.props.navigation} />
        </Content>
        <Footer>
          <FooterTab style={styles.footer}>
            <Button style={styles.button} active vertical>
              <Icon type="Feather" name="home" />
              <Text style={styles.legenda}>Home</Text>
            </Button>
            <Button style={styles.button} vertical>
              <Icon type="Feather" name="bell" />
              <Text style={styles.legenda}>Alertas</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Sacola')} style={styles.button} vertical>
              <Icon type="Feather" name="shopping-bag" />
              <Text style={styles.legenda}>Sacola</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('HistoricoPedidos')} style={styles.button} vertical>
              <Icon type="Feather" name="list" />
              <Text style={styles.legenda}>Pedidos</Text>
            </Button>
            <Button style={styles.button} vertical>
              <Icon type="Feather" name="user" />
              <Text style={styles.legenda}>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00BA51',
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  footer: {
    backgroundColor: '#00BA51',
  },
  legenda: {
    fontSize: 10
  }
});