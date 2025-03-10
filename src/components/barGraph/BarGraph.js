import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function BarGraph() {
  return (
    <Card className="cardInfo cardGraph" sx={{ borderRadius: 5 }}>
      <Typography className="title" variant="h5" component="div">
        Temperatura média dos últimos dias
      </Typography>
      <BarChart
        className="graphChart"
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
          { data: [60, 50, 15, 25] },
        ]}
        xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </Card>
  );
}
