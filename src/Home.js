import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure you have styles for better UI

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Employee Timesheet Management System</h1>
      <p>
        This system allows employees to log their work hours and managers to
        track and update timesheets efficiently.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>📋 View all employee timesheets</li>
        <li>⏰ Add new work logs with start & end times</li>
        <li>✏️ Update existing timesheets</li>
        <li>❌ Delete incorrect timesheets</li>
        <li>👨‍💼 Assign employees to timesheets</li>
        <li>🔍 Search and filter timesheets easily</li>
      </ul>

      <h2>How It Works</h2>
      <p>
        The application interacts with a backend API, fetching and updating
        employee timesheet data. It uses React for the frontend and a .NET Core
        Web API for the backend. Employees are stored separately and linked to
        their respective timesheets.
      </p>

      <h2>Navigation</h2>
      <button className="btn" onClick={() => navigate("/sctime")}>
        View Timesheets
      </button>
      <button className="btn" onClick={() => navigate("/time")}>
        Add New Timesheet
      </button>
      <button className="btn" onClick={() => navigate("/employee")}>
        View Employees
      </button>
    </div>
  );
};

export default Home;
