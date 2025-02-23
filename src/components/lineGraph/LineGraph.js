import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[
        {
          scaleType: "band",
          data: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        },
      ]}
      yAxis={[
        {
          min: 0,
          max: 50,
        },
      ]}
      series={[
        {
          data: [25, 30, 19, 41, 32, 37],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
