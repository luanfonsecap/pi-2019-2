import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Body } from 'native-base';
import { Badge } from 'react-native-elements';

import HeaderLogged from '../../Components/HeaderLogged';
import Home from './Home';
import Carrinho from './Carrinho';
import Notificacoes from './Notificacoes';

const Index = ({ navigation }) => {

  /* Necessário adicionar o navigation para passagem dos parametros ao trocar de tab
    e animar o badge com função que recebe a quantidade de notificações (status dos pedidos?)
  */

  /* Adicionar também badge que irá mostrar quantidade de produtos no carrinho */

  /* Necessário adicionar estrelas de avaliação com react-native-elements*/
  
  return (
    <Container>
      <Header androidStatusBarColor="#00BA51" style={{ display: 'none' }}></Header>
      <HeaderLogged />

      <Tabs tabBarPosition="top">

        <Tab heading={<TabHeading style={styles.tabHeading}>
          <Icon name="home" />
        </TabHeading>}>
          <Home navigation={navigation} />
        </Tab>

        <Tab heading={<TabHeading style={styles.tabHeading}>
          <Badge value={3} status={'error'}
            containerStyle={{ position: 'absolute', top: 6, right: 10 }}
          />
          <Icon name="alert" />
        </TabHeading>}>
          <Notificacoes navigation={navigation} />
        </Tab>

        <Tab heading={<TabHeading style={styles.tabHeading}>
          <Icon style={styles.cart} type="Foundation" name="shopping-cart" />
        </TabHeading>}>
          <Carrinho navigation={navigation} />
        </Tab>

        <Tab heading={<TabHeading style={styles.tabHeading}>
          <Icon name="list" />
        </TabHeading>}>
        </Tab>

        <Tab heading={<TabHeading style={styles.tabHeading}>
          <Icon type="Foundation" name="torso" />
        </TabHeading>}>
        </Tab>

      </Tabs>
    </Container>
  );
}

const styles = StyleSheet.create({
  tabHeading: {
    backgroundColor: '#00BA51',
  },
  cart: {
    fontSize: 50,
  },
});

export default Index;