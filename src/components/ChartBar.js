import React from "react";
import { Dimensions } from "react-native";

import { BarChart } from "react-native-chart-kit";

export default function ChartBar() {
  return (
    <BarChart
      data={{
        labels: ["January", "February", "March", "April"],
        datasets: [
          {
            data: [20, 45, 28, 80],
          },
        ],
      }}
      width={Dimensions.get("window").width - 8}
      height={200}
      chartConfig={{
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 10,
        borderRadius: 16,
      }}
    />
  );
}
