import React from "react";

import { StatusBar } from "expo-status-bar";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";

import UserContext from "../contexts/user.context";
import DispatchContext from "../contexts/dispatch.context";

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
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { login } = React.useContext(UserContext);
  const dispatch = React.useContext(DispatchContext);

  const handleLogin = async (email, password) => {
    if (data.password.length <= 4) {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
    if (data.email.length === 0) {
      setData({
        ...data,
        isValidUser: false,
      });
    }
    if (data.password.length >= 4 && data.email.length !== "") {
      setData({
        ...data,
        spinner: true,
      });
      let payload = { email, password };
      try {
        let resp = await login(dispatch, payload);
        if (resp === "ERRO") {
          Alert.alert("Erro!", "Email ou senha incorretos", [{ text: "Ok" }]);
        }
      } catch (error) {
        console.log("Catch Login", error);
      } finally {
        setData({
          ...data,
          spinner: false,
        });
      }
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
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
      <View style={styles.image}>
        <Image source={require("./../../assets/login-right.png")} />
      </View>
      <Spinner
        visible={data.spinner}
        textContent={"Logando..."}
        textStyle={styles.spinnerTextStyle}
      />

      <Text style={[styles.text_footer]}>Email</Text>

      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          returnKeyType="next"
          error={true}
          errorText="errr"
          placeholder="E-mail"
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
        Senha
      </Text>
      <View style={styles.action}>
        <Feather name="lock" size={20} />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#666666"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={[styles.textInput, {}]}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? (
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

      <TouchableOpacity>
        <Text style={{ color: "#009387", marginTop: 15 }}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            handleLogin(data.email, data.password);
          }}
          style={styles.signIn}
        >
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text
              style={[
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
