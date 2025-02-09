import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Employee.css";
const Employee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios
      .get("https://localhost:7255/api/Employee")  // Corrected URL
      .then((response) => {
        console.log(response.data);  // Log response
        setData(response.data);  // Set data in state
        setLoading(false);  // Set loading to false
      })
      .catch((error) => {
        console.error(error);  // Log any errors
        setError("Error fetching data: " + error.message);  // Set error message
        setLoading(false);  // Set loading to false in case of an error
      });
  }, []);  // Empty dependency array ensures the effect runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (id) => {
    navigate(`/employee/${id}`);  // Navigate to update page with employee ID
  };

  return (
    <div>
      <h1>Employees Multi-View</h1>
      <div className="entity-list">
        {data.map((entity) => (
          
          <div
          key={entity.id}
          className="entity-card"
          onClick={() => handleCardClick(entity.id)} // Make card clickable
        >
            <div className="entity-item">
              <strong>Name:</strong> {entity.name}
            </div>
            <div className="entity-item">
              <strong>Email:</strong> {entity.email}
            </div>
            <div className="entity-item">
              <strong>Phone Number:</strong> {entity.phoneNumber}
            </div>
            <div className="entity-item">
              <strong>Date of Birth:</strong> {new Date(entity.dob).toLocaleDateString()}
            </div>
            <div className="entity-item">
              <strong>Job Title:</strong> {entity.jobTitle}
            </div>
            <div className="entity-item">
              <strong>Department:</strong> {entity.department}
            </div>
            <div className="entity-item">
              <strong>Salary:</strong> ${entity.salary}
            </div>
            <div className="entity-item">
              <strong>Start Date:</strong> {new Date(entity.startDate).toLocaleDateString()}
            </div>
            <div className="entity-item">
              <strong>End Date:</strong> {entity.endDate ? new Date(entity.endDate).toLocaleDateString() : "N/A"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;

