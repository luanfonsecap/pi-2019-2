/* Configuraões de navegação do app */
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './src/Pages/Login';
import Home from './src/Pages/Home';
import CadProdutor from './src/Pages/CadProdutor';
import Presentation from './src/Pages/Presentation';
import CadClient from './src/Pages/CadClient';

const MainNavigator = createStackNavigator({
  Home: {screen: Home, navigationOptions: {header: null}},
  Login: {screen: Login, navigationOptions: {header: null}},
  Presentation: {screen: Presentation, navigationOptions: {header: null}},
  CadProdutor: {screen: CadProdutor, navigationOptions: {header: null}},
  CadClient: {screen: CadClient, navigationOptions: {header: null}}
});

const App = createAppContainer(MainNavigator);

export default App;