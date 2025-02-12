import React, { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SingleEmployee.css";

const SingleEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    jobTitle: "",
    department: "",
    salary: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://localhost:7255/api/Employee/${id}`)
        .then((response) => {
          const empData = response.data;
          setEmployee({
            ...empData,
            dob: empData.dob ? empData.dob.split("T")[0] : "",
            startDate: empData.startDate ? empData.startDate.split("T")[0] : "",
            endDate: empData.endDate ? empData.endDate.split("T")[0] : null,
          });
        })
        .catch((error) => console.error("Error fetching data", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id
      ? `https://localhost:7255/api/Employee/${id}`
      : "https://localhost:7255/api/Employee/new";
    const method = id ? "put" : "post";

    axios[method](url, employee)
      .then((response) => {
        // Show an alert when the response is successful
        alert("Employee information saved successfully!");
        navigate("/"); // Redirect after saving
      })
      .catch((error) => {
        console.error("Error saving data", error);
        alert("There was an error saving the employee data.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>{id ? "Update Employee" : "Create Employee"}</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        placeholder="Enter employee's full name"
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Enter employee's email"
        required
      />

      <label>Phone Number:</label>
      <input
        type="text"
        name="phoneNumber"
        value={employee.phoneNumber}
        onChange={handleChange}
        placeholder="Enter employee's phone number"
        required
      />

      <label>Date of Birth:</label>
      <input
        type="date"
        name="dob"
        value={employee.dob}
        onChange={handleChange}
        placeholder="Select employee's date of birth"
        required
      />

      <label>Job Title:</label>
      <input
        type="text"
        name="jobTitle"
        value={employee.jobTitle}
        onChange={handleChange}
        placeholder="Enter employee's job title"
        required
      />

      <label>Department:</label>
      <input
        type="text"
        name="department"
        value={employee.department}
        onChange={handleChange}
        placeholder="Enter employee's department"
        required
      />

      <label>Salary:</label>
      <input
        type="number"
        name="salary"
        value={employee.salary}
        onChange={handleChange}
        placeholder="Enter employee's salary"
        required
      />

      <label>Start Date:</label>
      <input
        type="date"
        name="startDate"
        value={employee.startDate}
        onChange={handleChange}
        placeholder="Select employee's start date"
        required
      />

      {/* Only show End Date field when updating an employee */}
      {id && (
        <>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={employee.endDate || ""} // Set to an empty string if null
            onChange={handleChange}
            placeholder="Select employee's end date (if applicable)"
          />

          <button
            type="button"
            onClick={() => setEmployee({ ...employee, endDate: null })}
            className="remove" // Set endDate to null on button click
          >
            Remove End Date
          </button>
        </>
      )}

      <button type="submit">{id ? "Update" : "Create"}</button>
    </form>
  );
};

export default SingleEmployee;
