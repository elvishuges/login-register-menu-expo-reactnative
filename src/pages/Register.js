import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AuthContext from "./../contexts/auth";

import { LinearGradient } from "expo-linear-gradient";

import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";

export default function Login({ navigation }) {
  const [data, setData] = React.useState({
    spinner: false,
    name: "",
    password: "",
    email: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { register } = React.useContext(AuthContext);

  const handleRegister = async (name, email, password) => {
    setData({
      ...data,
      spinner: true,
    });
    try {
      let payload = { email, password, name };
      let rsp = await register(payload);
      if (rsp === "OK") {
        Alert.alert("Sucesso!", "Usuário cadastrado com sucesso", [
          { text: "Ok" },
        ]);
        return;
      }
      Alert.alert("Erro!", "Algo deu errado", [{ text: "Ok" }]);
    } catch (error) {
      Alert.alert("Erro!", "Algo deu errado", [{ text: "Ok" }]);
    } finally {
      setData({
        ...data,
        spinner: false,
      });
    }
  };

  const handleNameChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };

  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 4) {
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
      <Spinner
        visible={data.spinner}
        textContent={"Cadastrando..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.image}>
        <Image source={require("./../../assets/login-right.png")} />
      </View>
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 10,
          },
        ]}
      >
        Nome
      </Text>
      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          autoCapitalize="none"
          onChangeText={(val) => handleNameChange(val)}
        />
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
          placeholder="e-mail"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          autoCapitalize="none"
          onChangeText={(val) => handleEmailChange(val)}
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
        Senha
      </Text>
      <View style={styles.action}>
        <Feather name="lock" size={20} />
        <TextInput
          placeholder="Senha"
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
      {data.isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            campo deve ter mais de 4 caracteres.
          </Text>
        </Animatable.View>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#009387", marginTop: 15 }}>
          Já possue cadastro?
        </Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            handleRegister(data.name, data.email, data.password);
          }}
          style={styles.signIn}
        >
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
  spinnerTextStyle: {
    color: "#FFF",
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
