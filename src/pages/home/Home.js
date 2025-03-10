import React from "react";
import { Typography, Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";

function HomePage() {
  
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
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao Sistema de Monitoramento de Estações Meteorológicas
      </Typography>
      <Typography variant="body1" gutterBottom>
        Selecione uma estação no menu lateral para visualizar os dados.
      </Typography>
      <Typography variant="h6" sx={{ mt: 4 }}>
      </Typography>
    </Box>
  );
}

export default HomePage;