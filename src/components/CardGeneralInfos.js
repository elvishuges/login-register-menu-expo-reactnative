import React from "react";

import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";

export default function CardGrneralInfos(props) {
  const { totalHours } = props;
  return (
    <View style={styles.container}>
      <Card style={styles.cardHeader}>
        <Text style={styles.textHours}>{totalHours} hrs </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  cardHeader: {
    backgroundColor: "#009387",
    height: 100,
    borderRadius: 20,
    alignItems: "center",
  },
  textHours: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
