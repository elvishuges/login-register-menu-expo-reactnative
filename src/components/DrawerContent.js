import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import UserContext from "../contexts/user.context";
import DispatchContext from "../contexts/dispatch.context";

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const { logout } = React.useContext(UserContext);
  const dispatch = React.useContext(DispatchContext);

  const handleLogout = async (e) => {
    logout(dispatch);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "data:image/jpeg;base64,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",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Bem-vindo</Title>
                <Caption style={styles.caption}>Administrador</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="desktop-mac-dashboard" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate("Dashboard");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="sitemap" color={color} size={size} />
              )}
              label="Projetos"
              onPress={() => {
                props.navigation.navigate("Projects");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-group" color={color} size={size} />
              )}
              label="Usuários"
              onPress={() => {
                props.navigation.navigate("BookmarkScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog-refresh-outline" color={color} size={size} />
              )}
              label="Minhas configurações"
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sair"
          onPress={() => {
            handleLogout();
            props.navigation.closeDrawer();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
