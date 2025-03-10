import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LinearProgress from "@mui/material/LinearProgress";
import InfoCard from "../../components/infoCard/InfoCard";
import LineGraph from "../../components/lineGraph/LineGraph";
import BarGraph from "../../components/barGraph/BarGraph";
import CarouselGraphs from "../../components/carousel/Carousel";

const getMeasurements = async ({ setMeasurements, setLoading, id }) => {
  try {
    const response = await axios.get(
      `https://esquizofrenia.top/api/measurements/station/${id}/`
    );
    setMeasurements(response.data);
    setLoading(false);
  } catch (err) {
    console.error("Erro ao acessar as medições:", err);
    setLoading(false);
  }
};

function measurementComparison(lastMeasurements, measurementLabel) {
  const value = (
    lastMeasurements[0][measurementLabel] -
    lastMeasurements[1][measurementLabel]
  ).toFixed(2);
  return value >= 0 ? `+${value}` : `${value}`;
}

export default function PageContent() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [weatherStation, setWeatherStation] = React.useState([]);
  const [measurements, setMeasurements] = React.useState([]);
  const lastMeasurements = measurements.slice(-5);

  React.useEffect(() => {
    getMeasurements({ setMeasurements, setLoading, id });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (measurements === undefined || measurements.length == 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">Nenhuma medição encontrada</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ margin: "0px 30px 30px 30px" }}>
        <Typography className="title" variant="h4" component="div">
          Estação Meteorológica {lastMeasurements[4].Weather_Station_id}
        </Typography>
        <Typography className="title" variant="h6" component="div">
          {weatherStation.description}
        </Typography>
        <Typography className="title" variant="h6" component="div">
          Ultima medição:{" "}
          {new Date(lastMeasurements[4].timestamp).toLocaleString("pt-BR")}
        </Typography>
      </div>
      <InfoCard
        measurementLabel={"Temperatura Atual"}
        measurementLabel2={"graus"}
        measurementValue={`${lastMeasurements[4].temperature} °C`}
        measurementComp={measurementComparison(lastMeasurements, "temperature")}
        icon={<ThermostatIcon className="icon" />}
      />
      <InfoCard
        measurementLabel={"Umidade"}
        measurementLabel2={"%"}
        measurementValue={`${lastMeasurements[4].humidity.toFixed(2)} %`}
        measurementComp={measurementComparison(lastMeasurements, "humidity")}
        icon={<WaterDropIcon className="icon" />}
      />
      <InfoCard
        measurementLabel={"Nível UV"}
        measurementValue={lastMeasurements[4].uv_index}
        measurementComp={measurementComparison(lastMeasurements, "uv_index")}
        icon={<Brightness7Icon className="icon" />}
      />
      <InfoCard
        measurementLabel={"Luminosidade"}
        measurementValue={lastMeasurements[4].light_intensity}
        measurementComp={measurementComparison(
          lastMeasurements,
          "light_intensity"
        )}
        icon={<WbSunnyIcon className="icon" />}
      />
      <LineGraph lastMeasurements={lastMeasurements} />
      <BarGraph />
      <CarouselGraphs lastMeasurements={lastMeasurements}/>
    </Box>
  );
}
