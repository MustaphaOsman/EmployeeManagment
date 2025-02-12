import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employee from "./Employee/Employee";
import SingleEmployee from "./SingleEmployee/SingleEmployee.js";
import Timesheet from "./SingleTimeSheet/SingleTimeSheet.js";
import Navbar from "./NavBar/NavBar";
import SchedulerToggle from "./ScheduelSheet/SchedulerToggle .js";

const App = () => {
  return (
    <Router>
           <Navbar />
      <Routes>
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/new" element={<SingleEmployee />} />
        <Route path="/employee/:id" element={<SingleEmployee />} />

        <Route path="/time" element={<Timesheet />} />

        <Route path="/sctime" element={<SchedulerToggle />} />

      </Routes>
    </Router>
  );
};

export default App;
