import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';

import Home from './Pages/Home';
import Presentation from './Pages/Presentation';
import Login from './Pages/Login';
import CadProdutor from './Pages/CadProdutor';
import CadClient from './Pages/CadClient';

import IndexC from './Pages/Cliente/Index';
import MercadoProdutor from './Pages/Cliente/MercadoProdutor';
import Sacola from './Pages/Cliente/Sacola';
import HistoricoPedidos from './Pages/Cliente/Pedidos';

import IndexP from './Pages/Produtor/Index';
import Pedidos from './Pages/Produtor/Pedidos';
import GerenciaPedido from './Pages/Produtor/GerenciaPedido';
import GerenciaProduto from './Pages/Produtor/GerenciaProduto'
import Mercado from './Pages/Produtor/Mercado';
import AltDados from './Pages/Produtor/AltDados';


import Header from './Components/Header';

const headerComponent = {headerTitle: <Header />, headerLeft: null};
const noHeader = {header: null};

const stackLogout = createStackNavigator({
  Home: {screen: Home, navigationOptions: noHeader}, 
  Presentation: {screen: Presentation, navigationOptions: headerComponent},
  Login: {screen: Login, navigationOptions: headerComponent},
  CadProdutor: {screen: CadProdutor, navigationOptions: headerComponent},
  CadClient: {screen: CadClient, navigationOptions: headerComponent},
});

const stackLoggedC = createStackNavigator({
  IndexC: {screen: IndexC, navigationOptions: noHeader},
  MercadoProdutor: {screen: MercadoProdutor, navigationOptions: noHeader},
  Sacola: {screen: Sacola, navigationOptions: noHeader},
  HistoricoPedidos: {screen: HistoricoPedidos, navigationOptions: noHeader},
});

const stackLoggedP = createStackNavigator({
  IndexP: {screen: IndexP, navigationOptions: noHeader},
  Pedidos: {screen: Pedidos, navigationOptions: noHeader},
  GerenciaPedido: {screen: GerenciaPedido, navigationOptions: noHeader},
  GerenciaProduto: {screen: GerenciaProduto, navigationOptions: noHeader},
  Mercado: {screen: Mercado, navigationOptions: noHeader},
  AltDados: {screen: AltDados, navigationOptions: noHeader},
});

const Routes = createAppContainer(
  createSwitchNavigator(
  {
    stackLogout: {screen: stackLogout, navigationOptions: noHeader},
    stackLoggedP: {screen: stackLoggedP, navigationOptions: noHeader},
    stackLoggedC: {screen: stackLoggedC, navigationOptions: noHeader},
  },
  {
    initialRouteName: 'stackLogout',
  })
);

export default Routes;