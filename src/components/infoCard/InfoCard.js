import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

export default function InfoCard({
  measurementLabel,
  measurementLabel2,
  measurementValue,
  measurementComp,
  icon,
}) {
  return (
    <Card className="cardInfo" sx={{ borderRadius: 5 }}>
      <CardContent className="cardContent">
        <Typography className="title" variant="h5" component="div">
          {measurementLabel}
        </Typography>
        <Typography className="info" variant="h3" component="div">
          {measurementValue}
        </Typography>
        <Typography style={{display:"flex", alignItems:"center"}} variant="h7" component="div">
          {measurementComp > 0 ? <NorthIcon className="comparisonIcon" style={{color:"green"}} /> : <SouthIcon className="comparisonIcon" style={{color:"red"}}/>}
          {measurementComp === 0 ? 0 : measurementComp} {measurementLabel2}
        </Typography>
      </CardContent>
      {icon}
    </Card>
  );
}
