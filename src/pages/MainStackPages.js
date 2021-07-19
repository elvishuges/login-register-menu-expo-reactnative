import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Details from "./Details";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Usuarios from "./Users";

const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => (
  <MainStack.Navigator>
    <MainStack.Screen
      options={{
        title: "Dashboard",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#009387" },
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={30}
            color="#fff"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerTitleAlign: "center",
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <MainStack.Screen
      options={{
        title: "Details",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#009387" },
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={30}
            color="#fff"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerTitleAlign: "center",
      }}
      name="Details"
      component={Details}
    />
    <MainStack.Screen
      options={{
        title: "Projetos",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#009387" },
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={30}
            color="#fff"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerTitleAlign: "center",
      }}
      name="Projects"
      component={Projects}
    />
    <MainStack.Screen
      options={{
        title: "Desenvolvedores",
        headerTitleStyle: { color: "#fff" },
        headerStyle: { backgroundColor: "#009387" },
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={30}
            color="#fff"
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerTitleAlign: "center",
      }}
      name="Users"
      component={Usuarios}
    />
  </MainStack.Navigator>
);

export default MainStackScreen;
