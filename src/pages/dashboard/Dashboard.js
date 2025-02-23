import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import InfoCard from "../../components/infoCard/InfoCard";
import LineGraph from "../../components/lineGraph/LineGraph";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const getWeatherStations = async ({ setNavigation, setLoading }) => {
  try {
    const response = await axios.get(
      "http://136.248.79.113/api/weatherstations/"
    );
    const stationsNav = response.data.results.map((station) => ({
      segment: `Weather Station ${station.name}`,
      title: `Estação Meteorológica ${station.name}`,
      icon: <DashboardIcon />,
    }));

    setNavigation((prevNav) => [...prevNav, ...stationsNav]);
    setLoading(false);
  } catch (err) {
    console.error("Erro ao acessar o banco:", err);
  }
};

const getMeasurements = async ({ setMeasurements, id }) => {
  try {
    const response = await axios.get(
      `http://136.248.79.113/api/measurements/${id}`
    );
    console.log(response.data);
    setMeasurements(response.data);
  } catch (err) {
    console.error("Erro ao acessar o banco:", err);
  }
};

function DemoPageContent({ pathname, id }) {
  const [measurements, setMeasurements] = React.useState([]);

  React.useEffect(() => {
    getMeasurements({ setMeasurements, id });
  }, [id]);

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
      <InfoCard
        measurement={"Temperatura Atual"}
        value={`${measurements.temperature} °C`}
        icon={<ThermostatIcon className="icon" />}
      />
      <InfoCard
        measurement={"Umidade"}
        value={`${measurements.humidity} %`}
        icon={<WaterDropIcon className="icon" />}
      />
      <InfoCard
        measurement={"Nível UV"}
        value={measurements.uv_index}
        icon={<Brightness7Icon className="icon" />}
      />
      <InfoCard
        measurement={"Luminosidade"}
        value={measurements.light_intensity}
        icon={<WbSunnyIcon className="icon" />}
      />
      <LineGraph />
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const router = useDemoRouter("/dashboard");
  const [loading, setLoading] = React.useState(true);
  const [navigation, setNavigation] = React.useState([
    {
      kind: "header",
      title: "Menu",
    },
    {
      segment: "Home",
      title: "Início",
      icon: <DashboardIcon />,
    },
  ]);

  React.useEffect(() => {
    getWeatherStations({ setNavigation, setLoading });
  }, []);

  // if (loading) return <p>Carregando...</p>

  return (
    // preview-start
    <AppProvider
      navigation={navigation}
      branding={{
        logo: <img src="/uerj-logo.png" alt="UERJ logo" />,
        title: "Estação Meteorológica",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} id={1} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

export default DashboardLayoutBasic;
