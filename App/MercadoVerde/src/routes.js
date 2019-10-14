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
import GerenciaPedidos from './Pages/Produtor/GerenciaPedido';


import Header from './Components/Header';

let options = {headerTitle: <Header />, headerLeft: null};

const Routes = createAppContainer(
  createStackNavigator({
    Home: {screen: Home, navigationOptions: {header: null}}, 
    Presentation: {screen: Presentation, navigationOptions: options},
    Login: {screen: Login, navigationOptions: options},
    CadProdutor: {screen: CadProdutor, navigationOptions: options},
    CadClient: {screen: CadClient, navigationOptions: options},
    IndexP: {screen: IndexP, navigationOptions: {header: null}},
    IndexC: {screen: IndexC, navigationOptions: {header: null}},
    Pedidos: {screen: Pedidos, navigationOptions: {header: null}},
    GerenciaPedidos: {screen: GerenciaPedidos, navigationOptions: {header: null}}

  })
);

export default Routes;