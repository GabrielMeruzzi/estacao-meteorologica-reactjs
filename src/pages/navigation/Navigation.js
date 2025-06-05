import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import CloudIcon from "@mui/icons-material/Cloud";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import HomePage from "../home/Home";
import PageContent from "../dashboard/Dashboard";
import MapPage from "../mapPage/MapPage";
import "./Navigation.css";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

export default function NavigationLayout() {
  const navigate = useNavigate();
  const [navigation, setNavigation] = React.useState([
    { segment: " ", title: "Início", icon: <HomeIcon /> },
    { segment: "mapa", title: "Mapa das Estações", icon: <MapIcon /> },
    { kind: "header", title: "Estações Meteorológicas" },
  ]);

  React.useEffect(() => {
    const stationsRef = collection(db, "stations");
    onSnapshot(
      stationsRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            segment: `estacao/${doc.id}`,
            title: `${d.name}`,
            icon: <CloudIcon />,
          };
        });
        setNavigation((prevNav) => [...prevNav, ...data]);
      },
      (error) => {
        console.error("Erro no listener de stations:", error);
      }
    );
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
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/estacao/:id" element={<PageContent />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}
