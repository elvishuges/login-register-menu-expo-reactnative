import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import ChartDonot from "../components/ChartDonot";
import ChartBar from "../components/ChartBar";
const Dashboard = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.chartTitle}>Projetos</Text>
        <Card style={styles.cardChart}>
          <ChartDonot />
        </Card>
        <Text style={styles.chartTitle}>Projetos por mês</Text>
        <ChartBar />
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingHorizontal: 3,
  },
  chartProjects: {
    paddingHorizontal: 5,
    paddingRight: 30,
  },
  chartTitle: {
    marginHorizontal: 12,
    marginVertical: 5,
    fontSize: 15,
    color: "#000",
  },
  cardChart: {
    elevation: 5,
    borderRadius: 16,
    backgroundColor: "#E3F7E0",
  },
});
