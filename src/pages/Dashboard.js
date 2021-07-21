import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import userActions from "./../actions/user.actions";

import DispatchContext from "../contexts/dispatch.context";

import ChartDonot from "../components/ChartDonot";
import ChartBar from "../components/ChartBar";
import CardGeneralInfos from "../components/CardGeneralInfos";

import chartColors from "./../utils/chartsColos";

const Dashboard = ({ navigation }) => {
  const { colors } = useTheme();
  const [barChartLabels, setBarChartLabels] = useState(["01", "02", "03"]);
  const [barChartData, setBarChartData] = useState([0, 0, 0]);
  const [donotChartData, setDonotChartData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const dispatch = React.useContext(DispatchContext);

  useEffect(() => {
    async function fetchAPI() {
      let responseHours = await userActions.getAllHours(dispatch);
      let responseProjects = await userActions.getAllProjects(dispatch);
      foramtBarChartData(responseHours);
      const foramtedDonotData = formatDonotChartData(
        responseProjects,
        responseHours
      );
      setDonotChartData(foramtedDonotData);
      console.log(foramtedDonotData);
    }

    fetchAPI();
  }, []);

  const formatDonotChartData = (projects, hours) => {
    let formatedDonotDataElement = [];
    let num = 0;

    projects.forEach((project) => {
      const projectHours = hours.filter((hour) => hour.project === project._id);
      if (projectHours.length) {
        const valueHours = projectHours.reduce(
          (prev, curr) => curr.hours + prev,
          0
        );
        const chartElement = {
          name: project.name,
          value: valueHours,
          color: "",
          legendFontColor: "#000",
          legendFontSize: 12,
          color: chartColors[num++ % chartColors.length],
        };
        formatedDonotDataElement.push(chartElement);
      }
    });
    return formatedDonotDataElement;
  };

  const foramtBarChartData = (hours) => {
    const groups = groupByHoursInMonth(hours);
    const groupKeys = Object.keys(groups);
    const groupsValues = Object.values(groups);
    const totalHours = groupsValues.reduce(
      (total, value) => {
        return total + value;
      },

      0
    );
    setTotalHours(totalHours);
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
      <ScrollView>
        <CardGeneralInfos totalHours={totalHours}></CardGeneralInfos>
        <Text style={styles.chartTitle}>Projetos:</Text>
        <View style={styles.viewChart}>
          <ChartDonot chartData={donotChartData} />
        </View>

        <Text style={styles.chartTitle}>Horas por mês:</Text>
        <ChartBar dataset={barChartData} labels={barChartLabels} />
        <Text style={styles.chartTitle}>Infos:</Text>
        <View style={styles.viewChart}></View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  viewChart: {
    paddingLeft: 0,
    elevation: 5,
    borderRadius: 16,
    marginHorizontal: 5,
    backgroundColor: "#eff3ff",
  },
  cardChart: {
    marginHorizontal: 5,
  },
});
