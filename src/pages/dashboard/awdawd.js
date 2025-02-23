import { useState, useEffect } from "react";
import "./Dashboard.css";
import HeaderDashboard from "../../components/headerDashboard/HeaderDashboard"

function Dashboard() {
  const [id, setId] = useState(null);

  useEffect(() => {
    setId("E03");
  }, []);

  return (
    <div className="dashboardDiv">
        <HeaderDashboard />
    </div>
  );
}

export default Dashboard;
