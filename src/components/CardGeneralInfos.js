import React from "react";

import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";

export default function CardGrneralInfos(props) {
  const { totalHours, totalProjects } = props;
  return (
    <View style={styles.container}>
      <Card style={styles.cardHeader}>
        <Text style={styles.textHours}>
          Total de horas gastas: {totalHours} hrs{" "}
        </Text>
        <Text style={styles.textProjects}>
          Projetos cadastrados: {totalProjects} projetos{" "}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 3,
  },
  cardHeader: {
    backgroundColor: "#009387",
    height: 100,
    borderRadius: 20,
    alignItems: "center",
    textAlign: "center",
  },
  textHours: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  textProjects: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
