import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Pages/Home';
import Presentation from './Pages/Presentation';
import Login from './Pages/Login';
import CadProdutor from './Pages/CadProdutor';
import CadClient from './Pages/CadClient';
import IndexP from './Pages/Produtor/Index';
import IndexC from './Pages/Cliente/Index';
import Pedidos from './Pages/Produtor/Pedidos';
import GerenciaPedido from './Pages/Produtor/GerenciaPedido';
import GerenciaProduto from './Pages/Produtor/GerenciaProduto'


import Header from './Components/Header';

const headerComponent = {headerTitle: <Header />, headerLeft: null};
const noHeader = {header: null};

const Routes = createAppContainer(
  createStackNavigator({
    Home: {screen: Home, navigationOptions: noHeader}, 
    Presentation: {screen: Presentation, navigationOptions: headerComponent},
    Login: {screen: Login, navigationOptions: headerComponent},
    CadProdutor: {screen: CadProdutor, navigationOptions: headerComponent},
    CadClient: {screen: CadClient, navigationOptions: headerComponent},
    IndexP: {screen: IndexP, navigationOptions: noHeader},
    IndexC: {screen: IndexC, navigationOptions: noHeader},
    Pedidos: {screen: Pedidos, navigationOptions: noHeader},
    GerenciaPedido: {screen: GerenciaPedido, navigationOptions: noHeader},
    GerenciaProduto: {screen: GerenciaProduto, navigationOptions: noHeader},
  })
);

export default Routes;