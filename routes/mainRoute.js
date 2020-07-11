import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";


import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import SignUp1 from "../screens/SignUp1";
import Home from "../screens/home";

import AppNavigator from './walkthroughRoutes';


const DrawerNavigation = createDrawerNavigator({
    Login: Login,
    SignUp: SignUp,
    SignUp1: SignUp1,
    Home: Home,
});

const StackNavigation = createStackNavigator(
{
  AppNavigator,  
  DrawerNavigation: {
        screen: DrawerNavigation
      },
      Login: Login,
      SignUp: SignUp,
      SignUp1: SignUp1
    },
    {
      headerMode: "none"
    }
);

const AppContainer = createAppContainer(StackNavigation);

export default AppContainer;