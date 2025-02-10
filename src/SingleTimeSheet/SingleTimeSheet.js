import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SingleTimeSheet/SingleTimeSheet.css";

const Timesheet = () => {
  const [employees, setEmployees] = useState([]); // To store employee data
  const [selectedEmployee, setSelectedEmployee] = useState(""); // To track selected employee
  const [startTime, setStartTime] = useState(""); // To track start time
  const [endTime, setEndTime] = useState(""); // To track end time
  const [error, setError] = useState(""); // For error handling
  const [successMessage, setSuccessMessage] = useState(""); // For successful form submission


  useEffect(() => {
    // Fetch employee data for the dropdown
    axios
      .get("https://localhost:7255/api/Employee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        setError("Error fetching employee data: " + error.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!selectedEmployee || !startTime || !endTime) {
      setError("Please fill in all fields.");
      return;
    }

    const timeSheetData = {
      employeeId: selectedEmployee,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    // Post the form data to an API endpoint (assuming you have an API to handle it)
    axios
      .post("https://localhost:7255/api/Timesheet", timeSheetData)
      .then((response) => {
        setSuccessMessage("Timesheet submitted successfully!");
        setError(""); // Clear error on success
      })
      .catch((error) => {
        setError("Error submitting timesheet: " + error.message);
      });
  };

  return (
    <div>
      <h1>Timesheet Form</h1>

      {/* Display error or success messages */}
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      {/* Timesheet form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee">Select Employee:</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">-- Select Employee --</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <button type="submit">Submit Timesheet</button>
      </form>
    </div>
  );
};

export default Timesheet;
