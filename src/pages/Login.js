import React, { useState, useContext, useEffect } from "react";

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";

import DispatchContext from "../contexts/dispatch.context";
import UserContext from "../contexts/user.context";

import userActions from "./../actions/user.actions";

import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

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
import { color } from "react-native-elements/dist/helpers";

export default function Login(props) {
  const isFocused = useIsFocused();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [spinnerState, setSpinnerState] = useState(false);

  const dispatch = React.useContext(DispatchContext);
  const { erroLogin } = useContext(UserContext);

  const handleClickLogin = async () => {
    const emailError = emailValidator(email.value);

    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    dispatch({ type: "AUTH_LOGIN_ERRO", erro: null });

    setSpinnerState(true);
    let payload = { email: email.value, password: password.value };

    try {
      let resp = await userActions.login(dispatch, payload);
    } catch (error) {
    } finally {
      setSpinnerState(false);
    }
  };

  useEffect(() => {
    // Call only when screen open or when back on screen
    if (isFocused) {
      return () => {
        setEmail({ ...email, value: "", error: "" });
        setPassword({ ...password, value: "", error: "" });
        dispatch({ type: "AUTH_LOGIN_ERRO", erro: null });
      };
    }
  }, [props, isFocused]);

  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleNavigationRegister = () => {
    props.navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={require("./../../assets/login-right.png")} />
      </View>

      <Spinner
        visible={spinnerState}
        textContent={"Logando..."}
        textStyle={styles.spinnerTextStyle}
      />

      {erroLogin ? (
        <View style={styles.erroTextResponse}>
          <Text>{erroLogin}</Text>
        </View>
      ) : null}

      <Text>Email</Text>

      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          value={email.value}
          placeholder="E-mail"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        {email.error ? null : (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        )}
      </View>
      {email.error ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{email.error}</Text>
        </Animatable.View>
      ) : null}
      <Text
        style={{
          marginTop: 5,
        }}
      >
        Senha
      </Text>
      <View style={styles.action}>
        <Feather name="lock" size={20} />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#666666"
          secureTextEntry={secureTextEntry ? true : false}
          style={styles.textInput}
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {secureTextEntry ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      {password.error ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{password.error}</Text>
        </Animatable.View>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          console.log("Funcionalidade pendente");
        }}
      >
        <Text style={{ color: "#009387", marginTop: 10 }}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            handleClickLogin();
          }}
          style={styles.signIn}
        >
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text
              style={{
                color: "#fff",
              }}
            >
              Sign In
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavigationRegister()}
          style={styles.signUp}
        >
          <Text
            style={{
              color: "#009387",
            }}
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
  signUp: {
    borderColor: "#009387",
    borderWidth: 1,
    marginTop: 15,
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
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  erroTextResponse: {
    alignItems: "center",
  },
});
