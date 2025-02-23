import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './InfoCard.css'

export default function InfoCard({measurement, value, icon}) {
  return (
    <Card className="cardInfo" sx={{ borderRadius: 5 }}>
      <CardContent className="cardContent">
        <Typography className="title" variant="h5" component="div">
          {measurement}
        </Typography>
        <Typography className="info" variant="h3" component="div">
          {value}
        </Typography>
        <Typography className="info" variant="h7" component="div">
          - 0.5 graus
        </Typography>
      </CardContent>
      {icon}
    </Card>
  );
}
