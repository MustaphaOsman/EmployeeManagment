import React, { useState } from "react";
import TimesheetList from "./ListTimesheet";
import CalendarApp from "./Scheduel";

import "./ScheduelToogle.css";

const SchedulerToggle = () => {
  const [isSchedulerView, setIsSchedulerView] = useState(true);

  return (
    <div>
      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isSchedulerView}
            onChange={() => setIsSchedulerView(!isSchedulerView)}
          />
          <span className="slider round"></span>
        </label>
        <span>{isSchedulerView ? "Scheduler View" : "List View"}</span>
      </div>

      {isSchedulerView ? <CalendarApp /> : <TimesheetList />}
    </div>
  );
};

export default SchedulerToggle;
