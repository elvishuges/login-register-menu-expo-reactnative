import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import UserContext from "../contexts/user.context";
import DispatchContext from "../contexts/dispatch.context";

import ChartDonot from "../components/ChartDonot";
import ChartBar from "../components/ChartBar";

const Dashboard = ({ navigation }) => {
  const { colors } = useTheme();
  const [barChartLabels, setBarChartLabels] = useState(["01", "02", "03"]);
  const [barChartData, setBarChartData] = useState([0, 0, 0]);

  const dispatch = React.useContext(DispatchContext);
  const { getAllUsers, getAllHours, getAllProjects } =
    React.useContext(UserContext);

  useEffect(() => {
    async function fetchAPI() {
      let responseHours = await getAllHours(dispatch);
      foramtBarChartData(responseHours);
    }

    fetchAPI();
  }, []);

  const foramtBarChartData = (hours) => {
    const groups = groupByHoursInMonth(hours);
    const groupKeys = Object.keys(groups);
    const groupsValues = Object.values(groups);
    setBarChartData(groupsValues);
    setBarChartLabels(groupKeys);
  };

  const groupByHoursInMonth = (data) => {
    let hoursInMonth = {};

    data.forEach(function (val) {
      var date = val.day.split("-")[1];
      if (hoursInMonth[date] === undefined) {
        hoursInMonth[date] = val.hours;
      } else {
        hoursInMonth[date] += val.hours;
      }
    });

    return hoursInMonth;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.chartTitle}>Projetos:</Text>
        <Card style={styles.cardChart}>
          <ChartDonot />
        </Card>
        <Text style={styles.chartTitle}>Horas por mês:</Text>
        <ChartBar dataset={barChartData} labels={barChartLabels} />
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
    paddingHorizontal: 5,
  },
  chartProjects: {
    paddingHorizontal: 5,
    paddingRight: 30,
  },
  chartTitle: {
    marginHorizontal: 12,
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
  },
  cardChart: {
    elevation: 0,
    borderRadius: 16,
    backgroundColor: "#eff3ff",
  },
});
