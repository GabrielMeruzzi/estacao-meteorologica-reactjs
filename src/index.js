import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DashboardLayoutBasic from "./pages/dashboard/Dashboard.js";
import "bootstrap/dist/css/bootstrap.min.css";


export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayoutBasic />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);