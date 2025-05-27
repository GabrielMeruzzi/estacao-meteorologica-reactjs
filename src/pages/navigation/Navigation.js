import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import HomePage from "../home/Home";
import PageContent from "../dashboard/Dashboard";
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
            title: `Estação Meteorológica ${d.name}`,
            icon: <DashboardIcon />,
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
          <Route path="/estacao/:id" element={<PageContent />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}
