import React from "react";
import { Dimensions } from "react-native";

import { BarChart, LineChart } from "react-native-chart-kit";

import { formatNumberToStringMonth } from "./../utils/functions";

export default function ChartBar(props) {
  const { dataset, labels } = props;
  return (
    <BarChart
      data={{
        labels: labels,
        datasets: [
          {
            data: dataset,
          },
        ],
      }}
      width={Dimensions.get("window").width - 10}
      height={200}
      chartConfig={{
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#eff3ff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        formatXLabel: (x) => formatNumberToStringMonth(x),
        formatYLabel: (x) => `${x} hrs`,
      }}
      style={{
        marginHorizontal: 5,
        borderRadius: 16,
      }}
    />
  );
}
