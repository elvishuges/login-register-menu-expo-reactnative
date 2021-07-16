import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Login from "./Login";
import Register from "./Register";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none" initialRouteName="Logind">
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="Register" component={Register} />
  </RootStack.Navigator>
);

export default RootStackScreen;
