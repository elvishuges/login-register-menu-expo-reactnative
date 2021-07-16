import React from "react";
import { View, Text, Button, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";

const Details = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Text style={{ color: colors.text }}>Details</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
