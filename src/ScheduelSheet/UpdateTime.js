import React, { useEffect, useState } from "react";  
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../ScheduelSheet/updateTime.css";

const TimesheetUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    employeeId: "", // changed to employeeId
    startTime: "",
    endTime: "",
    workSummary: "",
  });

  const [employees, setEmployees] = useState([]); // To store employee data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
   
    axios
      .get(`https://localhost:7255/api/Timesheet/${id}`)
      .then((response) => {
        const { employeeId, startTime, endTime, workSummary } = response.data;
        setFormData({
          employeeId,
          startTime: startTime.slice(0, 16), // Format for input datetime-local
          endTime: endTime.slice(0, 16),
          workSummary,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching timesheet data: " + error.message);
        setLoading(false);
      });

   
    axios
      .get("https://localhost:7255/api/Employee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        setError("Error fetching employee data: " + error.message);
      });
  }, [id]);

  const employeeChosen = employees.find(emp => emp.id === formData.employeeId);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://localhost:7255/api/Timesheet/update/${id}`, formData)
      .then(() => {
        alert("Timesheet updated successfully!");
        navigate("/sctime");
      })
      .catch((error) => {
        setError("Error updating timesheet: " + error.message);
      });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="timesheet-update-form">
      <h2>Update Timesheet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Employee:</label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {employeeChosen && (
          <div className="form-group">
            <label>Employee Selected:</label>
            <input
              type="text"
              value={employeeChosen.name}
              readOnly
              className="form-input"
            />
          </div>
        )}

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label>Work Summary:</label>
          <textarea
            name="workSummary"
            value={formData.workSummary}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">Update</button>
          <button type="button" onClick={() => navigate("/timesheet")} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimesheetUpdateForm;
