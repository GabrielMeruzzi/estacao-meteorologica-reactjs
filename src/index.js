import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NavigationLayout from "./pages/navigation/Navigation.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavigationLayout />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);