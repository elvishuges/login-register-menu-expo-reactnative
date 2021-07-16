import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function Login({ navigation }) {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const loginHandle = (userName, password) => {
    if (data.username.length == 0 || data.password.length == 0) {
      setData({
        ...data,
        check_textInputChange: false,
        isValidUser: false,
      });
      return;
    }
    Alert.alert("Formulário submetido.", [{ text: "Okay" }]);
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.image}>
        <Image source={require("./../../assets/login-right.png")} />
      </View>
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 5,
          },
        ]}
      >
        E-mail
      </Text>
      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          placeholder="Your e-mail"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          autoCapitalize="none"
        />
      </View>

      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 10,
          },
        ]}
      >
        Username
      </Text>
      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          placeholder="Your Username"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          autoCapitalize="none"
        />
      </View>
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 10,
          },
        ]}
      >
        Password
      </Text>
      <View style={styles.action}>
        <Feather name="lock" size={20} />
        <TextInput
          placeholder="Your Password"
          placeholderTextColor="#666666"
          secureTextEntry={false}
          style={[styles.textInput, {}]}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity onPress={() => {}}>
          {true ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#009387", marginTop: 15 }}>
          Já possue cadastro?
        </Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity style={styles.signIn}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Sign Up
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    padding: 10,
  },
  image: {
    alignItems: "center",
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },

  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  button: {
    alignItems: "center",
    marginTop: 50,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
});
