import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";

import { Alert } from "react-native";

import { AuthContext } from "./../components/context";

import Spinner from "react-native-loading-spinner-overlay";

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
    spinner: false,
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = React.useContext(AuthContext);

  const loginHandle = (userName, password) => {
    if (data.password.length <= 4) {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
    if (data.username.length === 0) {
      setData({
        ...data,
        isValidUser: false,
      });
    }
    if (data.password.length >= 4 && data.username.length !== "") {
      setData({
        ...data,
        spinner: true,
      });
      setTimeout(() => {
        signIn(userName, password);
      }, 3000);
    }
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

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.image}>
        <Image source={require("./../../assets/login-right.png")} />
      </View>
      <Spinner
        visible={data.spinner}
        textContent={"Carregando..."}
        textStyle={styles.spinnerTextStyle}
      />

      <Text style={[styles.text_footer]}>Username</Text>

      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          placeholder="usuário"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          onChangeText={(val) => textInputChange(val)}
          autoCapitalize="none"
        />
        {data.check_textInputChange ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>
      {data.isValidUser ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            campo deve ter mais de 4 caracteres.
          </Text>
        </Animatable.View>
      )}
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 20,
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
      {data.isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            campo deve ter mais de 8 caracteres.
          </Text>
        </Animatable.View>
      )}

      <TouchableOpacity>
        <Text style={{ color: "#009387", marginTop: 15 }}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            loginHandle(data.username, data.password);
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
              Sign In
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[
            styles.signIn,
            {
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#009387",
              },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    padding: 10,
  },
  image: {
    alignItems: "center",
    paddingTop: 30,
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
  errorMsg: {
    color: "red",
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
