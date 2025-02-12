import React, { useEffect, useState } from "react"; 
import axios from "axios";
import "../SingleTimeSheet/SingleTimeSheet.css";

const Timesheet = () => {
  const [employees, setEmployees] = useState([]); // Store employee data
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Selected employee
  const [startTime, setStartTime] = useState(""); // Start time
  const [endTime, setEndTime] = useState(""); // End time
  const [workSummary, setWorkSummary] = useState(""); // Work summary
  const [error, setError] = useState(""); // Error handling
  const [successMessage, setSuccessMessage] = useState(""); // Success message

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
    if (!selectedEmployee || !startTime || !endTime || !workSummary) {
      setError("Please fill in all fields.");
      return;
    }
  
    // Convert startTime and endTime to Date objects for comparison
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
  
    // Check if endTime is after startTime
    if (endDate <= startDate) {
      setError("End time must be later than start time.");
      return;
    }
  
    const timeSheetData = {
      employeeId: selectedEmployee,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      workSummary: workSummary, // Include work summary
    };
  
    console.log("Timesheet Data:", timeSheetData);
  
    // Submit the form data to the API
    axios
      .post("https://localhost:7255/api/Timesheet/new", timeSheetData)
      .then((response) => {
        setSuccessMessage("Timesheet submitted successfully!");
        setError(""); // Clear error on success
        setSelectedEmployee("");
        setStartTime("");
        setEndTime("");
        setWorkSummary(""); // Reset work summary
      })
      .catch((error) => {
        setError("Error submitting timesheet: " + error.message);
      });
  };

  return (
    <div className="timesheet-container">
      <h1>Add Timesheet for Employee</h1>

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

        {/* New Work Summary Field */}
        <div className="form-group">
          <label htmlFor="workSummary">Work Summary:</label>
          <textarea
            id="workSummary"
            rows="3"
            value={workSummary}
            onChange={(e) => setWorkSummary(e.target.value)}
            placeholder="Describe the work done..."
          />
        </div>

        <button type="submit">Submit Timesheet</button>
      </form>
    </div>
  );
};

export default Timesheet;
