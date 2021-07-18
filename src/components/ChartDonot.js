import React from "react";

import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

import { Card } from "react-native-paper";

export default function ChartDonot() {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <PieChart
      data={[
        {
          name: "Larevel",
          population: 21500000,
          color: "rgb(28,47,133)",
          legendFontColor: "#000",
          legendFontSize: 12,
        },
        {
          name: "Reactjs",
          population: 2800000,
          color: "rgb(67,127,54)",
          legendFontColor: "#000",
          legendFontSize: 12,
        },
        {
          name: "Vuejs",
          population: 527612,
          color: "rgb(77,116,212)",
          legendFontColor: "#000",
          legendFontSize: 14,
        },
      ]}
      width={Dimensions.get("window").width - 40}
      height={170}
      chartConfig={chartConfig}
      yLabelsOffset={50}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
    />
  );
}
