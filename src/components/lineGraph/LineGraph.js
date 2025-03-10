import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

function getData(data, dataLabel) {
  try {
    return data.map((element) => {
      return element[dataLabel]
    });
  } catch (error) {
    console.error("Erro ao obter dados:", error);
    return [];
  }
}

function getTime(data) {
  try {
    return data.map((element) => {
      const date = new Date(element.timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    });
  } catch (error) {
    console.error("Erro ao obter horário:", error);
    return [];
  }
}

export default function BasicLineChart({
  lastMeasurements,
  measurementLabel,
  measurementTitle,
  graphVariation
}) {
  return (
    <Card className="cardInfo cardGraph" sx={{ borderRadius: 5 }}>
      <Typography className="title" variant="h5" component="div">
        {measurementTitle}
      </Typography>
      <LineChart
        className="graphChart"
        xAxis={[
          {
            scaleType: "band",
            data: getTime(lastMeasurements),
          },
        ]}
        // yAxis={[
        //   {
        //     min: {graphVariation}[0],
        //     max: {graphVariation}[1],
        //   },
        // ]}
        series={[
          {
            data: getData(lastMeasurements, measurementLabel),
          },
        ]}
      />
    </Card>
  );
}
