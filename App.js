import React, { useEffect, useReducer, useMemo } from "react";

import { StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContext from "./src/contexts/auth";
import DispatchContext from "./src/contexts/dispatch";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

import { DrawerContent } from "./src/components/DrawerContent";
import authActions from "./src/actions/auth.actions";

import RootStackPages from "./src/pages/RootStackPages";
import MainStackPages from "./src/pages/MainStackPages";

import authReducer from "./src/reducers/auth.reducer";

import { authPrevState } from "./src/reducers/auth.reducer";

export default function App(props) {
  const [isDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const [loginState, dispatch] = useReducer(authReducer, authPrevState);

  useEffect(() => {
    console.log("usereffect");
    let isCancelled = false;
    let userToken;
    userToken = null;
    AsyncStorage.getItem("userToken").then((item) => {
      if (!isCancelled) {
        let userToken = item;
        dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
      }
    });
    // try {
    //   let userToken = await AsyncStorage.getItem("userToken");
    //   dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    // } catch (error) {
    //   console.log("Error userEffect");
    // }
    return () => {
      isCancelled = true;
    };
    // let userToken;
    // userToken = null;
    // try {
    //   userToken = await AsyncStorage.getItem("userToken");
    // } catch (e) {
    //   console.log(e);
    // }
    // dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authActions}>
        <DispatchContext.Provider value={dispatch}>
          <NavigationContainer style={styles.container}>
            {loginState.userToken !== null ? (
              <Drawer.Navigator
                drawerContent={(props) => <DrawerContent {...props} />}
              >
                <Drawer.Screen name="main" component={MainStackPages} />
              </Drawer.Navigator>
            ) : (
              <RootStackPages />
            )}
          </NavigationContainer>
        </DispatchContext.Provider>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
