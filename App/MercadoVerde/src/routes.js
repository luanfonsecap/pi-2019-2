import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Home from './Pages/Home';
import Presentation from './Pages/Presentation';
import Login from './Pages/Login';
import CadProdutor from './Pages/CadProdutor';
import CadClient from './Pages/CadClient';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Presentation,
    Login,
    CadProdutor,
    CadClient,
  })
);

export default Routes;