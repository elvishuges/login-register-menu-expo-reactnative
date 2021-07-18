import React from "react";
import { Button, Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function CustomSnackbar(props) {
  const { visible, text } = props;
  return (
    <>
      <Snackbar duration={5000} style={StyleSheet.snackbar} visible={visible}>
        {text}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    color: "red",
    padding: 10,
  },
});
