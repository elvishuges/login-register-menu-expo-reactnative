import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import Register from "./Register";

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none" initialRouteName="Login">
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="Register" component={Register} />
  </RootStack.Navigator>
);

export default RootStackScreen;
