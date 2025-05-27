import Card from "@mui/material/Card";
import Carousel from "react-bootstrap/Carousel";
import LineGraph from "../lineGraph/LineGraph";

function CarouselGraphs({ lastMeasurements }) {

  console.log(lastMeasurements)
  return (
    <Card className="cardInfo" sx={{ borderRadius: 5 }}>
      <Carousel style={{ width: "100%", height: "100%" }}>
        <Carousel.Item
          interval={10000}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <LineGraph
          key={"temperature"}
            lastMeasurements={lastMeasurements}
            measurementLabel={"temperature"}
            measurementTitle={"Variação de temperatura"}
          />
        </Carousel.Item>
        <Carousel.Item
          interval={10000}
        >
          <LineGraph
          key={"humidity"}
            lastMeasurements={lastMeasurements}
            measurementLabel={"humidity"}
            measurementTitle={"Variação de umidade"}
          />
        </Carousel.Item>
        <Carousel.Item
          interval={10000}
        >
          <LineGraph
          key={"uv_index"}
            lastMeasurements={lastMeasurements}
            measurementLabel={"uv_index"}
            measurementTitle={"Variação do nível UV"}
          />
        </Carousel.Item>
        <Carousel.Item
          interval={10000}
        >
          <LineGraph
          key={"light_intensity"}
            lastMeasurements={lastMeasurements}
            measurementLabel={"light_intensity"}
            measurementTitle={"Variação da luminosidade"}
          />
        </Carousel.Item>
      </Carousel>
    </Card>
  );
}

export default CarouselGraphs;
