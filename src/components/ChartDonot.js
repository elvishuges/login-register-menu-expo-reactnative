import React from "react";

import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function ChartDonot(props) {
  const { chartData } = props;
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    useShadowColorFromDataset: false, // optional
    formatYLabel: (x) => `${x} hrs`,
  };
  return (
    <PieChart
      data={chartData}
      width={Dimensions.get("window").width - 40}
      height={170}
      chartConfig={chartConfig}
      yLabelsOffset={10}
      accessor={"value"}
      backgroundColor={"transparent"}
      absolute
    />
  );
}
