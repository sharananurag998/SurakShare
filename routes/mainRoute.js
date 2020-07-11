import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import SignUp1 from "../screens/SignUp1";

import WalkthroughNavigator from './walkthroughRoutes';
import DrawerRoute from './drawerRoute';

const StackNavigation = createStackNavigator(
{
  WalkthroughNavigator,
  Login: {screen: Login, navigationOptions:{
    headerShown: false
  }},
  SignUp:{screen: SignUp, navigationOptions:{
    headerShown: false
  }},
  SignUp1:{screen: SignUp1, navigationOptions:{
    headerShown: false
  }},
  DrawerRoute,
},
);

const AppContainer = createAppContainer(StackNavigation);

export default AppContainer;