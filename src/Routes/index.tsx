import React from "react";
import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route
} from "react-router-dom";
import TemperatureTrend from "../Containers/Components/Trends/TemepratureTrend";
import Dashboard from "../Containers/Components/Dashboard/Dashboard";
import WindTrend from "../Containers/Components/Trends/WindTrend";

interface Props {
}

const Routes: React.FC<Props> = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trend/temperature/:id" element={<TemperatureTrend />} />
        <Route path="/trend/wind/:id" element={<WindTrend />} />
      </RouterRoutes>
    </Router>
  );
}

export default Routes