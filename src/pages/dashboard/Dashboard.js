import * as React from "react";
import "./Dashboard.css";
import axios from "axios";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "../home/Home";
import PageContent from "../pageContent/PageContent";

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
});

const getWeatherStations = async (setNavigation) => {
  try {
    const response = await axios.get("https://esquizofrenia.top/api/weatherstations/");
    const stationsNav = response.data.results.map((station) => ({
      segment: `estacao/${station.id}`,
      title: `Estação Meteorológica ${station.name}`,
      icon: <DashboardIcon />,
    }));
    setNavigation((prevNav) => [
      ...prevNav,
      ...stationsNav,
    ]);
  } catch (err) {
    console.error("Erro ao acessar o banco:", err);
  }
};

export default function DashboardLayoutBasic() {
  const navigate = useNavigate();
  const [navigation, setNavigation] = React.useState([
    { segment: "/inicio", title: "Início", icon: <HomeIcon /> },
  ]);

  React.useEffect(() => {
    getWeatherStations(setNavigation);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <AppProvider
      navigation={navigation}
      branding={{
        logo: <img src="/uerj-logo.png" alt="UERJ logo" />,
        title: "Estação Meteorológica",
        homeUrl: "/inicio",
      }}
      router={{ navigate: handleNavClick }}
      theme={theme}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/estacao/:id" element={<PageContent />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}
